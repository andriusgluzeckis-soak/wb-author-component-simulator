console.log("jquery version:"+$.fn.jquery);
const questionElement = document.querySelector('[data-question]');
const taskElement = document.querySelector('[data-task]');
const questionStringElement = document.querySelector('[data-question-string]');
const answersElement = document.querySelector('[data-answers]');

const onDrop = event => {
  const id = event.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);
  event.dataTransfer.clearData();
};

const onDragOver = event => {
  event.preventDefault();
};

function onDragStart(event) {
  console.log(event);
  event.dataTransfer.setData('text/plain', event.target.id);
};

const indentifySnapBox = () => {
  const snapBoxes = document.querySelectorAll('[data-snap-box]');
  for (let snapBoxIndex = 0; snapBoxIndex < snapBoxes.length; snapBoxIndex++) {
    const snapBox = snapBoxes[snapBoxIndex];
    snapBox.ondragover = event => {
      onDragOver(event);
    };
    snapBox.ondrop = event => {
      onDrop(event);
    };
  }
};

const addContent = (element, text) => {
  element.innerHTML = text;
};

const createAnswerElement = (answer, index) => {
  const answerElement = document.createElement('span');
  answerElement.classList.add('box');
  answerElement.setAttribute('data-answer', index);
  answerElement.setAttribute('id', `draggable-${index}`);
  answerElement.setAttribute('draggable', 'true');
  answerElement.innerHTML = answer;
  return answerElement;
};

createDraggable = () => {
  const dragElements = document.querySelectorAll('[data-answer]');
  for (let dragElementIndex = 0; dragElementIndex < dragElements.length; dragElementIndex++) {
    const dragElement = dragElements[dragElementIndex];
    dragElement.ondragstart = event => {
      onDragStart(event);
    };
  }
};

const createAnswers = (element, answers) => {
  const answersArray = answers.split('#');
  answersArray.forEach((answer, index) => {
    const answerElement = createAnswerElement(answer, index);
    element.appendChild(answerElement);
  });
  createDraggable();
};

const createSnapBox = (index) => {
  const boxElement = document.createElement('div');
  boxElement.classList.add('box');
  boxElement.setAttribute('data-snap-box', index);
  return boxElement;
};

const addQuestionString = (element, string) => {
  const words = string.split('#');

  words.forEach((word, index) => {
    element.innerHTML = element.innerHTML.concat(word);
    if (index !== words.length - 1) {
      element.appendChild(createSnapBox(index));
    }
  });
};

var preRender = function (){
    console.log("preRender");
    console.log(this.model.attributes);
  addContent(questionElement, this.model.attributes.question);
  addContent(taskElement, this.model.attributes.instruction);
  addQuestionString(questionStringElement, this.model.attributes.questionString);
  createAnswers(answersElement, this.model.attributes.answers);
  indentifySnapBox();
};

var postRender = function(){
  console.log("postRender");
};

preRender();
$(function() {
    postRender();
});
