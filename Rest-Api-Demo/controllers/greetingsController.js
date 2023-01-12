let greetings = [
    { id: 1, recipient: "Jõuluvana", message: "Hüppa pommi!", sender: "Juss"},
    { id: 2, recipient: "Juss", message: "Ei hüppa!", sender: "Jõuluvana"},
    { id: 3, recipient: "Päkapikk", message: "Sellele Jussile küll enam kommi ei vii!", sender: "Jõuluvana"},
]

const getGreetingById = function name(id) {
    return greetings.find(x => x.id == id);
}

exports.getAll = (req, res) => {
    res.send(greetings)
}

exports.getById = (req, res) => {
    const greeting = getGreetingById(req.params.id)
    if (typeof greeting === 'undefined') {
        return res.status(404).send({ error: "Greeting not found" })
    }
    res.send(greeting)
}

exports.create = (req, res) => {
    if (!req.body.recipient || !req.body.message || !req.body.sender) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newGreeting = {
        id: greetings[greetings.length - 1].id + 1,
        recipient: req.body.recipient,
        message: req.body.message,
        sender: req.body.sender,
    }
    greetings.push(newGreeting)
    res.status(201).location('localhost:8080/greetings/' + (greetings.length - 1)).send(
        newGreeting
    )
}

exports.update = (req, res) => {
    const greeting = getGreetingById(req.params.id)
    if (typeof greeting === 'undefined') {
        return res.status(404).send({ error: "Greeting not found" })
    }
    if (!req.body.recipient || !req.body.message || !req.body.sender) {
        return res.status(400).send({ error: "One or more params not found" })
    }
    greeting.recipient = req.body.recipient
    greeting.message = req.body.message
    greeting.sender = req.body.sender

    res.status(200).location('localhost:8080/greetings/' + greeting.id).send(greeting)
}

exports.delete = (req, res) => {
    const greeting = getGreetingById(req.params.id)
    if (typeof greeting === 'undefined') {
        return res.status(404).send({ error: "Greeting not found" })
    }
    greetings = greetings.filter(g => g.id !== greeting.id)
    res.status(204).send()
}
