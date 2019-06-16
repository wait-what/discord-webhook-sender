const request = require('superagent')

const getURL = () => {
    const url = document.getElementById('webhook_url').value

    if (url.length < 100) return M.toast({html: 'Provide a valid webhook URL'})
    else if (!require('valid-url').isUri(url)) return M.toast({html: 'The URL is invalid'})
    else return url
}

window.send = () => {
    const url = getURL()    

    const content = document.getElementById('msg_content').value
    const embed = document.getElementById('embed_content').value
    if (!content && !embed) return M.toast({html: 'Provide a message or an embed'})

    let toSend = {}

    if (content) {
        if (content.length < 1) return M.toast({html: 'The message is too short'})
        if (content.length > 2000) return M.toast({html: 'The message is too long. Up to 2k characters'})
        toSend.content = content
    }
    
    if (embed) {
        try { JSON.parse(embed) } catch(e) { return M.toast({html: 'Invalid embed JSON: ' + e}) }
        toSend.embeds = [JSON.parse(embed)]
    }
    
    request.post(url)
        .send(toSend)
        .then(() => M.toast({html: 'Done!'}))
        .catch((e) => M.toast({html: 'Error! The URL or embed may be invalid or you\'re using it too quickly: ' + e}))
}

window.patch = () => {
    const url = getURL()
    const name = document.getElementById('new_name').value

    if (!name) return M.toast({html: 'Provide a name'})

    request('PATCH', url)
        .send({ name: name })
        .then(() => M.toast({html: 'Done!'}))
        .catch((e) => M.toast({html: 'Error! The URL or data may be invalid or you\'re using it too quickly: ' + e}))
}

window.deleteWebhook = () => {
    const url = getURL()

    request.delete(url)
        .then(() => M.toast({html: 'Done!'}))
        .catch((e) => M.toast({html: 'Error! The URL may be invalid or you\'re using it too quickly: ' + e}))
}