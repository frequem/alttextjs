const ALTTEXT_GROUP_DEFAULT = "DEFAULT_GROUP";

var alttext_groups = [];
var alttext_orig_strings = [];

function alttextOnClick(event){
	let group = event.target.dataset.alttextgroup;
	if(group === undefined){
		group = ALTTEXT_GROUP_DEFAULT;
	}
	let i = alttext_groups[group].indexOf(event.target);
		
	if(typeof onAlttextClick === 'function')
			onAlttextClick(alttext_groups[group][i], alttext_groups[group][i].innerText, alttext_orig_strings[group][i], group);
}

function alttextApply(group){
	for(let i=0; i<alttext_groups[group].length; i++){
		let elem = alttext_groups[group][i];
		
		if(!(group in alttext_orig_strings)){
			alttext_orig_strings[group] = [];
		}
		alttext_orig_strings[group][i] = elem.innerText;
		
		elem.innerText = elem.dataset.alttext;
		elem.classList.add("alttext");
		elem.addEventListener('click', alttextOnClick, false);
	}
}

function elementOverflown(e){
	return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth;
}

function alttextNeeded(group=ALTTEXT_GROUP_DEFAULT){
	for(let i=0; i<alttext_groups[group].length; i++){
		let elem = alttext_groups[group][i];
		if(elementOverflown(elem))
			return true;
	}
	return false;
}

function alttextRestore(){
	for(let group in alttext_orig_strings){
		for(let j=0; j<alttext_orig_strings[group].length; j++){
			let elem = alttext_groups[group][j];
			elem.innerText = alttext_orig_strings[group][j];
			elem.classList.remove("alttext");
			elem.removeEventListener('click', alttextOnClick, false);
		}
	}
	alttext_orig_strings = [];
}

function alttextTry(){
	alttextRestore();
	for(let group in alttext_groups){
		if(alttextNeeded(group)){
			alttextApply(group);
		}
	}
}

function alttextInit(){
	window.addEventListener('resize', alttextTry);
	alttextRestore();
	
	let elems = document.querySelectorAll('[data-alttext]');
	for(let i=0; i<elems.length; i++){
		let elem = elems[i];
		
		let group = elem.dataset.alttextgroup;
		if(group === undefined){
			group = ALTTEXT_GROUP_DEFAULT;
		}
		
		if(!(group in alttext_groups)){
			alttext_groups[group] = [];
		}
		alttext_groups[group].push(elem);
	}
	alttextTry();
}
