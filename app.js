window.onload = function(){
	alttextInit();
};

function onAlttextClick(elem, str_alt, str_orig, group){
	console.log("clicked on:", elem);
	console.log("Alternative String:", str_alt);
	console.log("Original String:", str_orig);
	console.log("Element was in Group:", group);
}
