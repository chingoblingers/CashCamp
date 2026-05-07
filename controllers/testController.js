

export function postController(req, res){
    res.json({recived: req.body})
}

export function getController(req, res){
    res.json({ message: "CashCamp backend running" })
}