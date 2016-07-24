var matrix = function(v) {
	if(!this) return new matrix(v)
	if(!v) v = {}
	this.a  = 1
	this.b  = 0
	this.c  = 0
	this.d  = 1
	this.tx = 0
	this.ty = 0
	this.scale(v.scale||1)
	this.translate(v.tx||0,v.ty||0)
	this.rotate(v.rotation||0)
	return this
}
matrix.prototype.css = function() {
	return 'matrix('+
		this.a+','+
		this.b+','+
		this.c+','+
		this.d+','+
		this.tx+','+
		this.ty+')'
}
matrix.prototype.translate = function(tx,ty) {
	this.tx += tx * this.a + ty * this.c
	this.ty += tx * this.b + ty * this.d
	return this
}
matrix.prototype.scale = function(v) {
	if(v === 1) return this
	this.a *= v
	this.b *= v
	this.c *= v
	this.d *= v
	return this
}
matrix.prototype.rotate = function(angle/* radian */) {
	if(angle === 0) return this
	var cos = Math.cos(angle)
	var sin = Math.sin(angle)
	var a = this.a
	var b = this.b
	var c = this.c
	var d = this.d
	var tx = this.tx
	var ty = this.ty
	this.a   =  cos * a + sin * c
	this.b   =  cos * b + sin * d
	this.c   = -sin * a + cos * c
	this.d   = -sin * b + cos * d
	this.tx += tx * a + ty * c
	this.ty += tx * b + ty * d
	return this
}
module.exports = matrix
