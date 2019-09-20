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

    recuperarTodosRegistros() {

        let despesas = Array()

        let id = localStorage.getItem('id')

        //recuperando despesas em localstorage
        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa === null) {
                continue
            }

            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {
        let despesasFiltrada = Array()
        despesasFiltrada = this.recuperarTodosRegistros()

        //filtrando 
        if (despesa.ano != '') {
            despesasFiltrada = despesasFiltrada.filter(d => d.ano == despesa.ano)
        }

        if (despesa.mes != '') {
            despesasFiltrada = despesasFiltrada.filter(d => d.mes == despesa.mes)
        }

        if (despesa.dia != '') {
            despesasFiltrada = despesasFiltrada.filter(d => d.dia == despesa.dia)
        }

        if (despesa.tipo != '') {
            despesasFiltrada = despesasFiltrada.filter(d => d.tipo == despesa.tipo)
        }

        if (despesa.descricao != '') {
            despesasFiltrada = despesasFiltrada.filter(d => d.descricao == despesa.descricao)
        }

        if (despesa.valor != '') {
            despesasFiltrada = despesasFiltrada.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltrada;
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

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {
        document.getElementById('modal-titulo').className = 'modal-title text-danger'
        document.getElementById('modal-titulo').innerHTML = 'Erro na gravação'
        document.getElementById('modal-msg').innerHTML = 'Existem campos obrigatórios que não foram preenchidos'
        //$('#modalRetorno .modal-title').append('Erro na gravação')
        //$('#modalRetorno .modal-body p').append('Existem campos obrigatórios que não foram preenchidos')
        $('#modalRetorno').modal('show')
    }

}

function carregaListaDespesas(despesas = Array(), filtro = false) {

    if (despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros()
    }

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    despesas.forEach((d) => {
        //cria tr
        let linha = listaDespesas.insertRow()

        //cria tds
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        switch (d.tipo) {
            case '1':
                d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break

        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = Array()
    despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas, true)
}