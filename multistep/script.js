
let currentStep= 0;
const formSteps = document.querySelectorAll('.form-step')

const form = document.querySelector('form')


/* steps */
form.addEventListener('click', (e) => {
  if(!e.target.matches('[data-action]')) {
  return
  }

  const actions = {
  next() {
    if(!isValidInputs()) {
      return
    }
  
    currentStep++

  },
  
  prev() {
    currentStep--
  }
}


  const action = e.target.dataset.action
  actions[action] ()

  updateActiveStep()
  updateProgressStep()

})



/* Envio do formulário */
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const data = new FormData(form)
  alert(`Obrigado ${data.get('name')} !`)
}) 


/* Update steps */
function updateActiveStep() {
  formSteps.forEach(step => step.classList.remove('active'))
  formSteps[currentStep].classList.add('active')
}


const progressStep= document.querySelectorAll('.step-progress [data-step]')
function updateProgressStep() {
  progressStep.forEach((step, idx) => {
    step.classList.remove('active')
    step.classList.remove('done')

    if(idx < currentStep +1) {
      step.classList.add('active')
    }

    if (idx < currentStep) {
      step.classList.add('done')
    }

  })
}

const INPUT_CEP = document.getElementById('cep');
const INPUT_LOGRADOURO = document.getElementById('logradouro');
const INPUT_NUMERO = document.getElementById('numero');
const INPUT_BAIRRO = document.getElementById('bairro');
const INPUT_CIDADE = document.getElementById('cidade');
const INPUT_UF = document.getElementById('uf');

INPUT_CEP.addEventListener('blur', () => {
    let cep = INPUT_CEP.value;

    if (cep.length !== 8) {
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(json => {
            INPUT_LOGRADOURO.value = json.logradouro;
            INPUT_BAIRRO.value = json.bairro;
            INPUT_CIDADE.value = json.cidade;
            INPUT_UF.value = json.uf;

            INPUT_NUMERO.focus();

        });
})

/* Validação */
function isValidInputs() {
  const currentFormStep= formSteps[currentStep]
  const formFields = [...currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')]

  return formFields.every((input) => input.reportValidity())

}

/* Animation */
formSteps.forEach(formStep =>{
  function addHide() {
    formStep.classList.add('hide')
  }
  formStep.addEventListener('animationend', e => {
    addHide()
    formSteps[currentStep].classList.remove('hide')
  })
})

