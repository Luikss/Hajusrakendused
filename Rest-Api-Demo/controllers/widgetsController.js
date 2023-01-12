let widgets = [
    { id: 1, name: "Cizzbor", price: 29.99 },
    { id: 2, name: "Woowo", price: 26.99 },
    { id: 3, name: "Crazlinger", price: 59.99 },
]

const getWidgetById = function name(id) {
    return widgets.find(x => x.id == id);
}

exports.getAll = (req, res) => {
    res.send(widgets)
}

exports.getById = (req, res) => {
    const widget = getWidgetById(req.params.id)
    if (typeof widget === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    res.send(widget)
}

exports.create = (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newWidget = {
        id: widgets[widgets.length - 1].id + 1,
        name: req.body.name,
        price: req.body.price
    }
    widgets.push(newWidget)
    res.status(201).location('localhost:8080/widgets/' + (widgets.length - 1)).send(
        newWidget
    )
}

exports.update = (req, res) => {
    const widget = getWidgetById(req.params.id)
    if (typeof widget === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: "One or more params not found" })
    }
    widget.name = req.body.name
    widget.price = req.body.price
    res.status(200).location('localhost:8080/widgets/' + widget.id).send(widget)
}

exports.delete = (req, res) => {
    const widget = getWidgetById(req.params.id)
    if (typeof widget === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    widgets = widgets.filter(w => w.id !== widget.id)
    res.status(204).send()
}
