const { BigNumber } = require("bignumber.js");
let MIN_BUY_USDT = new BigNumber(60);
let MIN_SELL_BFT = new BigNumber(20);
let AUTO_TRADE_TOGGLE = true;
let AUTO_TRADE_TIMER;
let MAX_USDT_BFT_ERROR_COUNT = 0;
let AMOUNT_PRECISION = 2;
let PRICE_PRECISION = 4;
let accountA = {
  usdt: 0,
  bft: 500,
};
let accountB = {
  usdt: 3000,
  bft: 0,
};
let user = new Map().set("accountA", accountA).set("accountB", accountB);

function start(times) {
  let t = times;
  // setInterval(
  //   selfAutoTradeBot("accountA", "accountB"),100
  // )
  while (times > 0) {
    try {
      console.log(`第${t - times}笔交易`);
      selfAutoTradeBot("accountA", "accountB");
      times--;
    } catch (error) {
      throw new Error(error);
    }
  }
}
function selfAutoTradeBot(
  accessKey1,
  accessKey2,
  startTimestamp,
  duration,
  maxAmount = 200,
  minAmount = 20,
  isFirstTime = false,
  lastTransaction
) {
  try {
    const current = new Date();
    // 如果是给定时间，则做一个长时间的定时器，暂时不支持多时间段（或者多时间段换一个方法）
    if (startTimestamp && startTimestamp > current.getTime()) {
      const timeDiff = startTimestamp - current.getTime() + 1000;
      AUTO_TRADE_TIMER = setTimeout(() => {
        selfAutoTradeBot(
          accessKey1,
          accessKey2,
          startTimestamp,
          duration,
          maxAmount,
          minAmount,
          isFirstTime
        );
      }, timeDiff);
    } else {
      if (isFirstTime) {
        AUTO_TRADE_TOGGLE = true;
        // 如果开始时间大于当前时间，则每分钟检查一次
      }
      if (!AUTO_TRADE_TOGGLE) {
        console.log(`刷单已停止`);
        return;
      }

      // 判断是否已超时
      const startTime = startTimestamp || current.getTime();
      if (startTime + duration < current.getTime()) {
        console.log(`已超时，机器人交易结束`);
        throw `已超时，机器人交易结束`;
      }

      const defaultMaxAmount = maxAmount;
      const defaultMinAmount = minAmount;
      // 获得当前的行情以及时间
      //const orderbook = await market.getOrderbook(EXCHANGE, market, 5);

      // 获取两个账户的金额

      const myBFT1 = BigNumber(user.get(accessKey1).bft);
      const myUSDT1 = BigNumber(user.get(accessKey1).usdt);

      const myBFT2 = BigNumber(user.get(accessKey2).bft);
      const myUSDT2 = BigNumber(user.get(accessKey2).usdt);

      let buyer, buyerSecretKey, seller, sellerSecretKey;
      const sell1 = new BigNumber(2.5).plus(
        BigNumber.random().times(new BigNumber(2))
      );
      const buy1 = new BigNumber(2.5).minus(
        BigNumber.random().times(new BigNumber(2))
      );

      // 如果coverd未被覆盖，则切换方向
      if (lastTransaction && lastTransaction.coverd === false) {
        buyer = lastTransaction.seller;
        seller = lastTransaction.buyer;
        if (buyer === accessKey1) {
          //
          buyerSecretKey = accessKey1;
          sellerSecretKey = accessKey2;
        } else {
          buyerSecretKey = accessKey2;
          sellerSecretKey = accessKey1;
        }
      } else {
        // 将最大值修改为USDT/价格 或 最大BFT 中较小的那个
        // 如果设置的最大值大于现有BFT值则取最大BFT账户数值
        const maxAmountBN = new BigNumber(maxAmount);
        // 获取账户最大BFT值
        const maxBFT = myBFT1.comparedTo(myBFT2) > 0 ? myBFT1 : myBFT2;
        // 取另一个账户的值为最大USDT（因为随着价格的上涨或下落，USDT值会改变，可能会造成一个账户的BFT和USDT都比另一个账户多，此时只需要取另一个账户的usdt最为最大USDT
        const maxUSDT = maxBFT.isEqualTo(myBFT1) ? myUSDT2 : myUSDT1;
        // 最大值*卖1价格即USDT的最大值，如果账户最大的USDT都比这个最大值小，那需要重新设置数量
        const maxUSDTbyBFT = maxAmountBN.times(sell1);
        if (
          // 这个最大值大于账户最大的BFT
          (maxAmountBN.comparedTo(myBFT1) > 0 &&
            maxAmountBN.comparedTo(myBFT2) > 0) ||
          // 最大值=0
          maxAmount === 0 ||
          maxUSDT.comparedTo(maxUSDTbyBFT) < 0
        ) {
          // 获取账户最大USDT/卖1，此为USDT可买入最大BFT
          const maxBFTbyUSDT = new BigNumber(
            new BigNumber(maxUSDT).dividedBy(2.5).toFixed(4)
          );
          // 最大账户BFT和最大账户USDT/单价相比，取小的那个
          // 可以确保USDT及BFT值皆足够
          // maxAmount =
          //   maxBFT.comparedTo(maxBFTbyUSDT) > 0
          //     ? maxBFTbyUSDT.toNumber()
          //     : maxBFT.toNumber();

          if (maxBFT.comparedTo(maxBFTbyUSDT) > 0) {
            maxAmount = maxBFTbyUSDT.toNumber();
            MIN_BUY_USDT = maxUSDT;
          } else {
            maxAmount = maxBFT.toNumber();
          }
        }
        if (maxAmount < minAmount) {
          maxAmount = minAmount;
        }
        // 修改最小给定值，最小USDT应该等于最大数量*价格，最小BFT应该等于最大给定BFT值
        // 因为这个数量有两种可能性 1. 账户BFT最大值 2. USDT账户/卖价值，所以需要计算一下
        // 这样即便随机到了最大数量，仍旧可以买入及卖出
        if (!MIN_BUY_USDT.isEqualTo(maxUSDT)) {
          MIN_BUY_USDT = new BigNumber(maxAmount).times(new BigNumber(2.5));
        }
        MIN_SELL_BFT = new BigNumber(maxAmount);

        // 先判断BFT和USDT是否都大于最小给定值，
        let isBFTEnough1 = true,
          isUSDTEnough1 = true,
          isBFTEnough2 = true,
          isUSDTEnough2 = true;

        if (myBFT1.comparedTo(MIN_SELL_BFT) < 0) isBFTEnough1 = false;
        if (myUSDT1.comparedTo(MIN_BUY_USDT) < 0) isUSDTEnough1 = false;
        if (myBFT2.comparedTo(MIN_SELL_BFT) < 0) isBFTEnough2 = false;
        if (myUSDT2.comparedTo(MIN_BUY_USDT) < 0) isUSDTEnough2 = false;

        // 判断是否第一次执行，如果是，则存入数据库，如果不是，则从数据库中读取时间
        // const doc = await findOrInsertAutoTrade(
        //   EXCHANGE,
        //   accessKey1,
        //   accessKey2,
        //   market,
        //   duration,
        //   startTime
        // );

        // 先判断是否足够，只要A买B卖足够或B卖A买足够，则可以进行
        if (isBFTEnough1 && isUSDTEnough2) {
          buyer = accessKey2;
          seller = accessKey1;
        } else if (isBFTEnough2 && isUSDTEnough1) {
          buyer = accessKey1;
          seller = accessKey2;
        } else {
          console.log(`USDT或BFT皆不足，10秒后重新执行，maxAmount降低0.1`);
          MAX_USDT_BFT_ERROR_COUNT++;
          if (MAX_USDT_BFT_ERROR_COUNT < 10) {
            // AUTO_TRADE_TIMER = setTimeout(() => {
            //   selfAutoTradeBot(
            //     accessKey1,
            //     accessKey2,
            //     startTimestamp,
            //     duration,
            //     defaultMaxAmount,
            //     defaultMinAmount,
            //     startTime,
            //     false
            //   );
            // }, 10000);
            return ;
            throw "USDT或BFT不足，即将重试";
          } else {
            MAX_USDT_BFT_ERROR_COUNT = 0;
            throw "USDT或BFT不足，请充值或手动交易";
          }
        }
      }

      let price;

      // 计算价格
      // const price = randomPrice(new BigNumber(sell1), new BigNumber(buy1));
      let amount = randomAmount(
        new BigNumber(maxAmount),
        new BigNumber(minAmount)
      );

      if (lastTransaction && lastTransaction.coverd === false) {
        amount = lastTransaction.amount;
      }

      // 卖出

      // const sellResponse = await jdex.createMyOrder(
      //   SYMBOL,
      //   market,
      //   `sell`,
      //   amount,
      //   price,
      //   seller,
      //   sellerSecretKey
      // );
      let sellerCount = user.get(seller);
      let buyerCount = user.get(buyer);
      if (
        sellerCount.bft * sell1 + sellerCount.usdt <
        (buyerCount.bft * sell1 + buyerCount.usdt) * 0.8
      ) {
        price = randomPrice(
          new BigNumber(sell1),
          new BigNumber(buy1).plus(new BigNumber(sell1 - buy1).dividedBy(2))
        );
      } else {
        price = randomPrice(
          new BigNumber(buy1).plus(new BigNumber(sell1 - buy1).dividedBy(2)),
          new BigNumber(buy1)
        );
      }
      console.log(`计划以${price}价格卖出${amount}个BFT`);
      sellerCount.bft -= amount;
      sellerCount.usdt += amount * price;
      if (sellerCount.bft < 0) {
        throw `卖出失败，机器人停止`;
      }
      console.log(`计划以${price}价格买入${amount}个BFT`);
      buyerCount.bft += +amount;
      buyerCount.usdt -= amount * price;
      if (buyerCount.usdt < 0) {
        throw `买入失败，机器人停止`;
      }
      console.log("");
      console.log("卖家" + seller, user.get(seller));
      console.log("买家" + buyer, user.get(buyer));
      user.set(seller, sellerCount).set(buyer, buyerCount);
      // if (sellResponse.msg === `Success`) {
      //   Logger.log(`以${price}价格卖出${amount}个BFT成功`);
      //   // 卖出成功，先计入数据库
      //   const trDoc = await transactionRepo.create({
      //     symbol: SYMBOL,
      //     sellAccessKey: seller,
      //     orderId: sellResponse.data.id,
      //     price: price,
      //     amount: amount,
      //     type: TRANSACTION_TYPE.SELL,
      //     createTimestamp: Date.now(),
      //     status: TRANSACTION_STATUS.PROGRESS,
      //   });
      //   Logger.log(`保存成功`);

      //   // 买入
      //   Logger.log(`计划以${price}价格买入${amount}个BFT`);
      //   const buyResponse = await jdex.createMyOrder(
      //     SYMBOL,
      //     market,
      //     `buy`,
      //     amount,
      //     price,
      //     buyer,
      //     buyerSecretKey
      //   );

      // if (buyResponse.msg === `Success`) {
      //   // 成功
      //   Logger.log(`以${price}价格买入${amount}个BFT成功`);
      // trDoc.finishTimestamp = Date.now();
      // trDoc.status = TRANSACTION_STATUS.FINISHED;
      // trDoc.buyAccessKey = buyer;
      // await transactionRepo.save(trDoc);

      const current2= new Date();
      const currentHour = current2.getUTCHours();
      const bjHour =
        currentHour + 8 > 24 ? Math.abs(currentHour - 16) : currentHour + 8;
      let timeChangeRange = 0;
      if (bjHour >= 0 && bjHour < 7) {
        timeChangeRange = 1;
      } else {
        timeChangeRange = 4;
      }
      const randomInterval =
        Math.ceil(Math.random() * 120) * 1000 + timeChangeRange * 60 * 1000;
      // const randomInterval =
      //   Math.ceil(Math.random() * 30) * 1000 + timeChangeRange * 3 * 1000;
      // console.log(`随机秒数是${randomInterval}`);
      // const randomInterval =
      //   Math.ceil(Math.random() * 180) * 1000 + 3 * 60 * 1000;
      // const randomInterval =
      //   Math.ceil(Math.random() * 5) * 60000 + 10 * 60 * 1000;
      // console.log(`下一次交易将在${randomInterval}ms之后`);
      // clearTimeout(AUTO_TRADE_TIMER);
      // AUTO_TRADE_TIMER = setTimeout(() => {
      //   selfAutoTradeBot(
      //     accessKey1,

      //     accessKey2,
      //     startTimestamp,
      //     duration,

      //     defaultMaxAmount,
      //     defaultMinAmount,
      //     startTime,
      //     false,
      //     {
      //       buyer,
      //       seller,
      //       price,
      //       amount,
      //       coverd: lastTransaction ? !lastTransaction.coverd : false,
      //     }
      //   );
      // }, randomInterval);
      //   //  }, interval);
      // }
      //else {
      //     Logger.error(`ERROR ----------- ${buyResponse.msg}`);
      //     throw `买入失败，机器人停止`;
      //   }
      // } else {
      //   Logger.error(`ERROR ----------- ${sellResponse.msg}`);
      //   throw `卖出失败，机器人停止`;
      // }
    }
  } catch (e) {
    throw new Error(e);
    // await checkLockOrderAndCancelAll(accessKey1, secretKey1, market);
    // await checkLockOrderAndCancelAll(accessKey2, secretKey2, market);
    // 获取行情失败，10秒钟后重新执行
    // AUTO_TRADE_TIMER = setTimeout(() => {
    //   selfAutoTradeBot(
    //     EXCHANGE,
    //     accessKey1,
    //     secretKey1,
    //     accessKey2,
    //     secretKey2,
    //     market,
    //     duration,
    //     interval,
    //     maxAmount,
    //     minAmount,
    //     startTimestamp,
    //     endTimestamp,
    //     false
    //   );
    // }, 10000);
    // throw `获取买卖行情失败，请重试`;
  }
}

function randomPriceAndAmount(sell1, buy1, maxAmount, minAmount) {
  return {
    price: randomPrice(sell1, buy1),
    amount: randomAmount(maxAmount, minAmount),
  };
}

function randomPrice(sell1, buy1) {
  let priceBN;
  const priceDiff = sell1.minus(buy1);
  const priceProb = new BigNumber(BigNumber.random().times(priceDiff)).plus(
    buy1
  );
  // console.log('priceDiff :>> ', priceDiff);
  // console.log('sell1 :>> ', sell1);
  // console.log(buy1);
  if (priceProb < sell1 && priceProb > buy1) {
    priceBN = priceProb;
  }
  const price = priceBN.toFixed(PRICE_PRECISION);
  return price;
}

function randomAmount(maxAmount, minAmount) {
  const amountDiff = maxAmount.minus(minAmount);
  const amountBN = new BigNumber(BigNumber.random().times(amountDiff)).plus(
    minAmount
  );
  const amount = amountBN.toFixed(AMOUNT_PRECISION);
  return amount;
}

start(10);
