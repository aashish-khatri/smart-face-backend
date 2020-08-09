const handleProfile = (req, res, db) => {
	const {id} = req.params;
	db('users')
	.select('*')
	.from('users')
	.where({id})
	.then(user => {

		if(user.length)
			res.send(user[0])
		else
			res.status(400).json('not found')
	}
		)

}

module.exports = {
	handleProfile: handleProfile
}