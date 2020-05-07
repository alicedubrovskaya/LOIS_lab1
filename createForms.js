function startTest(){
    document.getElementById("button_start").hidden=true;
    document.getElementById("button_next").hidden=false;
    document.getElementById("button_findFormulas").hidden=true;

    var question = document.createElement('p')
    question.setAttribute("id","question")
    form.append(question)
    
    var answer=document.createElement("INPUT")
    answer.setAttribute("type", "text");
    answer.setAttribute("id","answer")
    form.append(answer)

    generQuestion()
}
  
function startFindFormulas(){
    document.getElementById("button_start").hidden=true;
    document.getElementById("button_findFormulas").hidden=true;
    document.getElementById("button_find").hidden=false;

    var field=document.createElement("INPUT")
    field.setAttribute("type", "text");
    field.setAttribute("id","field")
    find_formulas.append(field)

    var answer = document.createElement('p')
    answer.setAttribute("id","answer")
    find_formulas.append(answer)
}