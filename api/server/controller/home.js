const getHome = (req, res) => {
    res.send(`
    <html>
        <head>
            <title>Ukiyo</title>
        </head>
            <body>
                <pre>
╦ ╦╦╔═╦╦ ╦╔═╗   ╔═╗╔═╗╦
║ ║╠╩╗║╚╦╝║ ║───╠═╣╠═╝║
╚═╝╩ ╩╩ ╩ ╚═╝   ╩ ╩╩  ╩                                                                                                                                      
                </pre>
            </body>
    </html>
    `);
}

module.exports = { getHome };