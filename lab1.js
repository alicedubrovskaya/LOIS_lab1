//////////////////////////////////////////////////////////////////////////////////////
// Лабораторная работа 1 по дисциплине ЛОИС
// Выполнена студенткой группы 721703 БГУИР Дубровской Алисой Михайловной
// Файл содержит функции функции обработки тестовых заданий, генерации формул, нахождения всех подформул,
// проверки формулы на корректность
// 10.04.2020
//
function addBrackets(str){
    return "("+str+")"
}

function action1(str){//опер-р+константа
    str+=operationsForGenerating[Math.round(Math.random()*2)];
    str+=constants[Math.round(Math.random()*26)];
    str=addBrackets(str);
    count++;
    return str;
}

function action2(str){ //отрицание
    str="!"+str;
    str=addBrackets(str);
    count++;
    return str
}

function action3(str){
    miniFormula=""
    countMini=0
    str+=operationsForGenerating[Math.round(Math.random()*3)];
    generateMiniFormula(constants[Math.round(Math.random()*26)], 3)
    str+=miniFormula;
    str=addBrackets(str)
    return str
}
function generateMiniFormula(formula1,neededSize){
    countMini++
    var actionNumber=Math.round(((Math.random()*1)+1))
    switch(actionNumber){
        case 1:{
             miniFormula=action1(formula1);
             break;
        }
        case 2: {
            miniFormula=action2(formula1);
            break;
        }
    }
    if (countMini>=neededSize){
        return
    }
    else generateMiniFormula(miniFormula, neededSize)
}
function generateFormula(formula1, neededSize){
    var actionNumber=Math.round(((Math.random()*2)+1))
    
    switch(actionNumber){
        case 1:{
             formula=action1(formula1);
             break;
        }
        case 2: {
            formula=action2(formula1);
            break;
        }
        case 3:{
            formula=action3(formula1);
            break;
        }
    }
    if (count>=neededSize){
        return
    }
    else generateFormula(formula, neededSize)
}

function isInFormulasArray(string, array){
    isInArray=false;
    for (var i=0;i<array.length;i++){
        if (string==array[i])
        isInArray=true;
    }
    return isInArray;
}
function receiveSubFormula(position, formulasArray){
    var countOfOpeningBrackets=0;
    var countOfEndingBrackeets=0;
    var substr="";
    for (var iterator=position;iterator<formula.length;iterator++){ 
        substr+=formula[iterator];       
        if (formula[iterator]=='('){
            countOfOpeningBrackets++;
        }
        else if (formula[iterator]==')'){
            countOfEndingBrackeets++;
        }
        if (countOfOpeningBrackets==countOfEndingBrackeets){
            if (!isInFormulasArray(substr,formulasArray)) formulasArray.push(substr);
            return;
        }
    }
}
function findFormulas(formulasArray){
    for (var i=0;i<formula.length;i++){
        if (formula[i]=='('){
            receiveSubFormula(i, formulasArray);
        }
        else if (isInFormulasArray(formula[i],constants) && !isInFormulasArray(formula[i],formulasArray) && !isInFormulasArray(formula[i],operations)) {
            formulasArray.push(formula[i]);        
        }
    }
}


function generQuestion() {
    count=0; 
    formula=""
    generateFormula(constants[Math.round(Math.random()*25)], 2)
    formulasForUserArray.push(formula)
    question.innerHTML=(clicks+1)+". "+formula;
}

function getAnswer(){
    var input = document.getElementById("form");
    var content=input.elements[0].value;
    answersOfUser.push(content)
    answer.value="";
}
function end(){ 
    document.getElementById("question").hidden=true;
    document.getElementById("answer").hidden=true;
    document.getElementById("button_next").hidden=true;


    for (var iterator=0; iterator<10;iterator++){
        //стр-ра: output<-outputElement<-itemInformation
        var outputElement = document.createElement('form')
        output.append(outputElement)

        var formulasArray = new Array();
         formula=formulasForUserArray[iterator];
         findFormulas(formulasArray);
         var itemInformation=document.createElement('p')
         itemInformation.innerHTML=(iterator+1)+". "+formula;
         outputElement.append(itemInformation)

      
         if (formulasArray.length==answersOfUser[iterator]){
             points++
             itemInformation.innerHTML=itemInformation.innerText+" Ваш ответ верный: "+answersOfUser[iterator];
         }
         else{
            itemInformation.innerHTML=itemInformation.innerText+" Ваш ответ неверный:"+answersOfUser[iterator]
            +" (Верный ответ: "+formulasArray.length+")";
         }    
         
         for (var j=0;j<formulasArray.length;j++){
            var itemInformation=document.createElement('li')
            itemInformation.innerHTML=formulasArray[j];
            outputElement.append(itemInformation)
         }
    
        }
    var itemInformation=document.createElement('p')
    itemInformation.innerHTML="Ваш результат: "+points*10+"%";
    outputElement.append(itemInformation)
}
function test(){
    clicks++
    getAnswer() //взяли предыд ответ
    if (clicks<10){
        generQuestion() //сгенерировали вопрос на текущий
    }
    else {
        end()
        document.getElementById("output").hidden=false;
    }
}

function continueFindNew(){
    field.value=""
    var elem = document.getElementById("answer");
    elem.parentNode.removeChild(elem);

    var answer = document.createElement('p')
    answer.setAttribute("id","answer")
    find_formulas.append(answer)

    document.getElementById("button_reset").hidden=true;
    document.getElementById("button_find").hidden=false;
}
function checkOne() {
    var copy = formula;

    while (copy.match(/([|&~]|->)/g) || !copy.match(/^[A()]+$/g)) {
        var prevCopy = copy;
        copy = copy.replace(/\(![A-Z01]\)/g, 'A');
        copy = copy.replace(/\([A-Z01]([|&~]|->)[A-Z01]\)/g, 'A');
        if (copy === prevCopy) return false;
    }
    return copy === 'A';
}

function checkTwo() { 
    var openingBrackets = formula.split('(').length - 1;
    var closingBrackets = formula.split(')').length - 1;
    
    return openingBrackets == closingBrackets;
}

function areSymbolsCorrect(){
    return formula.match(/^([10A-Z()|&!~]|->)*$/g);
}

function isSyntaxCorrect(){
    return formula.match(/^[A-Z10]$/) ||
    (!formula.match(/\)\(/) && !formula.match(/[A-Z10]([^|&~]|(?!->))[10A-Z]/) &&
    !formula.match(/![A-Z10][^)]/) && !formula.match(/[^(]![A-Z10]/) &&
    !formula.match(/\([A-Z10]\)/) && checkOne() && checkTwo());
}


function check(){
    
    document.getElementById("button_find").hidden=true;
    
    var input = document.getElementById("find_formulas");
    var content=input.elements[0].value;
    formula=content;

    if  (!(areSymbolsCorrect() && isSyntaxCorrect()))
    {
        var itemInformation=document.createElement('p')
        itemInformation.innerHTML="Формула некорректна!";
        answer.append(itemInformation)
    }else
    {
        var formulasArray = new Array();
        var correctFormula=findFormulas(formulasArray);


        for (var j=0;j<formulasArray.length;j++){
            var itemInformation=document.createElement('li')
            itemInformation.innerHTML=formulasArray[j];
            answer.append(itemInformation)
        }

        var itemInformation=document.createElement('p')
        itemInformation.innerHTML="Количество: "+formulasArray.length;
        answer.append(itemInformation)

    }
        
    document.getElementById("button_reset").hidden=false;
}
