



    // let presentValue = 1000;
    // let rate = 0.05;
    // let periods = 12;
    // let years = 10;



    function futureValue(presentValue,rate,periods,years) {
        let fv = presentValue * Math.pow((1 + rate / periods), (periods * years));
        return fv;   // The function returns the product of p1 and p2
      };

    // console.log("presentValue ==>", presentValue);

    // let futureValue = presentValue * Math.pow((1 + rate / periods), (periods * years));

    // console.log("futureValue ==>", futureValue);



    // for (let i = 1; i <= years; i++) {

    //     let fv = 0;
    //     fv = presentValue * Math.pow((1 + rate / periods), (periods * i));
    //     console.log("year ==> " + i + " fv ==> " + fv);
    // }

    // console.log("futureValue ==>", futureValue);

    function presentValue(futureValue,rate,periods,years) {
        let numerator = futureValue;
        let denominator = Math.pow((1 + rate / periods), (periods * years));
        pv = numerator / denominator;
        return pv;   // The function returns the product of p1 and p2
      };

    // let numerator = futureValue;
    // let denominator = Math.pow((1 + rate / periods), (periods * years));
    // presentValue = numerator / denominator;
    //let pv = presentValue * Math.pow((1 + rate / periods), (periods * years));

    // for (let i = 1; i <= years; i++) {

    //     let pv = 0;
    //     let numerator = futureValue;
    //     let denominator = Math.pow((1 + rate / periods), (periods * i));
    //     pv = numerator / denominator;

    //     console.log("year ==> " + i + " pv ==> " + pv);

    // }

    // console.log("presentValue ==>", presentValue);

