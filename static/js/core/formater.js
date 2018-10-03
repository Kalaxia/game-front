const shortVersionTime = 2;
const longVersionTime = 3;
const detailedVersionTime = 10;
const shortNumber = 3;
const detailedNumber = 9;
const decimalSize = 3;
const numberShortNames = [," K"," M"," G"," P"];
const shortDate = 2;
const longDate = 5;
const dateDivisions = { name:[], value: []};

const fillDateDivisions = () => {
    const names = ["week","day","hour","minute","second","millisecond"];
    const values = [7*24*3600*1000,24*3600*1000,3600*1000,60000,1000,1];
    for (const cpt in names) {
        dateDivisions.name.push(names[cpt]);
        dateDivisions.value.push(values[cpt]);
    }
}
const formatNumber = () => {
    const numberInput= document.getElementById("number");
    const number = numberInput.value;
    const values = { short: [], long: [], detailed: []};
    let newNumber;
    let decimalNumber;
    let numberLength;
    if (isNumber(number)){
        decimalNumber=0;
        if (number.toString().includes(".")){
            newNumber=number*10;
            decimalNumber++;
            while (newNumber.toString().includes(".")){
                newNumber = newNumber *10;
                decimalNumber ++;
            }
            if(decimalNumber <= decimalSize) {
                numberLength = newNumber.toString().length-decimalNumber;
            }
            else {
                newNumber=Math.round(newNumber/Math.pow(10,decimalNumber-decimalSize));//-1 pour avoir un nombre avec 1 chiffre apres la virgule et arrondir correctement
                decimalNumber=decimalSize;
                numberLength= newNumber.toString().length-decimalNumber;
            }
        }
        else {
            newNumber = number;
            decimalNumber = 0;
            numberLength = newNumber.toString().length;
        }

        (numberLength>shortNumber)? (
            ((numberLength%shortNumber) === 0)?
                values.short.push(Math.floor(newNumber/Math.pow(10,numberLength-shortNumber+decimalNumber)) + numberShortNames[(numberLength/3)-1]):
                values.short.push(Math.round(newNumber/Math.pow(10,(numberLength+decimalNumber-shortNumber)))/Math.pow(10,shortNumber-numberLength%shortNumber)+numberShortNames[Math.floor((numberLength)/3)])
        ) : values.short.push(Math.round(newNumber/Math.pow(10,-shortNumber+numberLength+decimalNumber))/Math.pow(10,shortNumber-numberLength));

        (numberLength>shortNumber)? (
            ((numberLength%shortNumber) === 0)?
                values.short.push("test1"):
                values.short.push('test2')
        ) : values.short.push("test3");

        let detailedFormat="";
        let cpt = 0;
        let numberTemp = newNumber/Math.pow(10,decimalNumber);
        let stringTemp = numberTemp.toString();
        if (decimalNumber!=0)
            while (cpt<= decimalNumber){
                cpt++;
                detailedFormat=stringTemp[stringTemp.length-cpt]+detailedFormat;
            }
        numberTemp=Math.floor(numberTemp);

        cpt = 0;
        while (cpt<numberLength)
        {
            detailedFormat=numberTemp%1000 + ((cpt==0)?"":" ") +detailedFormat;
            numberTemp=(numberTemp-(numberTemp%1000))/1000;
            cpt=cpt+3;
        }
        values.detailed.push(detailedFormat);
        console.log("newNumber: "+newNumber + " values.short: "+values.short+" detailed format: "+values.detailed);

    }
};

const isNumber = (n) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
 };

const formatDate = (datetime) => {
    const dateInput= document.getElementById("date");
    const date = dateInput.value;
    fillDateDivisions();
    let now= new Date();
    if (Math.abs(now - datetime)>1000) {
        if (datetime>now) {
            return  "in " +formatTime(datetime-now, shortDate);
        }
        else {
            return formatTime(now-datetime,1)+" ago";
        }
    }
    else {
        return "Now";
    }
 }

 const formatTime = (duration, size) => {
      let stringDuration = "";
      let cpt = 0;
      let stringSize =0;
      let currentNumberOfTimeUnit;
      while( size>stringSize) {
          currentNumberOfTimeUnit =Math.floor(duration/dateDivisions.value[cpt]);
          stringDuration = stringDuration+
          ((currentNumberOfTimeUnit>0)?
              (currentNumberOfTimeUnit)+" "+dateDivisions.name[cpt]+
              ((currentNumberOfTimeUnit>1)?"s "
              :" ")
          :"")
          ;
          (Math.floor(currentNumberOfTimeUnit)>0||stringSize>0)?stringSize++:cpt=cpt;
          duration=duration-(currentNumberOfTimeUnit)*dateDivisions.value[cpt];
          cpt++;
      }
      return stringDuration;
 }
