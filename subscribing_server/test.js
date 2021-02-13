function dec_place(n, dp){
    dp = dp.toString().split(".");
    //dp = dp[1];
    console.log(dp)

    n = n.toString().split(".");

    let whole_number = n[0];
    let decimal = n[1];

    let _result = whole_number + ".";

    for(let i = 0; i < dp.length;i++){
        if(decimal[i]){
            _result += decimal[i];
        }
        else{
            console.log(_result)
            _result += "0";
        }
    }

    return parseFloat(_result);
}

console.log(dec_place(3877.2267, 0.0000001))