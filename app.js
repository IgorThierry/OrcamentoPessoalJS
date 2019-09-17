class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }

        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return (parseInt(proximoId) + 1)
    }

    gravar(d) {

        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }
}

let bd = new Bd()

function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {
        bd.gravar(despesa)
        document.getElementById('modal-titulo').className = 'modal-title text-success'
      
        document.getElementById('modal-titulo').innerHTML = 'Registro salva com sucesso'
        document.getElementById('modal-msg').innerHTML = 'Despesa cadastrada com sucesso'
        //$('#modalRetorno .modal-title').append('Registro salva com sucesso')
        //$('#modalRetorno .modal-body p').append('Despesa cadastrada com sucesso')
        $('#modalRetorno').modal('show')
    } else {
        document.getElementById('modal-titulo').className = 'modal-title text-danger'
        document.getElementById('modal-titulo').innerHTML = 'Erro na gravação'
        document.getElementById('modal-msg').innerHTML = 'Existem campos obrigatórios que não foram preenchidos'
        //$('#modalRetorno .modal-title').append('Erro na gravação')
        //$('#modalRetorno .modal-body p').append('Existem campos obrigatórios que não foram preenchidos')
        $('#modalRetorno').modal('show')
    }

}

