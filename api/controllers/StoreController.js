/**
 * StoreController
 *
 * @description :: Server-side logic for managing stores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req, res){
		res.view('index');
	},
	upload: function(req, res){
			req.file('image').upload({
			adapter: require('skipper-s3'),
			key: process.env.AWS_ACCESS_KEY_ID,
			secret: process.env.AWS_SECRET_ACCESS_KEY,
			bucket: process.env.AWS_BUCKET
		}, function (err, filesUploaded) {
			if (err) return res.negotiate(err);
			return res.ok({
				files: filesUploaded,
				textParams: req.params.all()
			});
		});
	}
};
