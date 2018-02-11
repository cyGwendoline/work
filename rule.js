/* pre */

/* 打开预处理区 */
function AddPreDoor() {
	var add = document.getElementById("pre_door");
	var pre_css = document.getElementById("pre");
	add.innerHTML=add.innerHTML.replace(/\s+/g,"");
	if(add.innerHTML=="打开预处理区") {
		
		pre_css.style.display = "block";
		add.innerHTML = "关闭预处理区";
 	}else if(add.innerHTML=="关闭预处理区") {
		pre_css.style.display = "none";
		add.innerHTML = "打开预处理区";
	}
}

/* 点此替换 */
function PreExchange() {
	var pre_before = document.getElementById("pre_button_before").value;
	var pre_after = document.getElementById("pre_button_after").value;
	var pre_word = document.getElementById("pre_text").value;
	pre_word = pre_word.replace(/(^\s*)|(\s*$)/g,"");
	if(pre_before == " ") {
		pre_word = pre_word.replace(/\s+/g,pre_after);
		document.getElementById("pre_text").value = pre_word;
	}else {
		pre_word = pre_word.replace(new RegExp(pre_before,"g"),pre_after);
		document.getElementById("pre_text").value = pre_word;
	}
}

/* 下一步 */
function PreNext() {
	document.getElementById("before_text").value = document.getElementById("pre_text").value;
}

/* 清空预处理区 */
function CleanPre() {
	document.getElementById("pre_text").value = "";
}


/* before */

/*排版*/
function Exchange() {
	var old_word = document.getElementById("before_text").value;
	var radio_value = document.getElementsByName("rule_radio"); /*获取单选按钮的值*/
	for(i = 0; i < radio_value.length; i++) {
		if(radio_value[i].checked == true) {
			var ra_val = radio_value[i].value;
			var new_word = NoSpace(old_word,ra_val);
		}
	}
	
	var after_ex = document.getElementById("after_text");
	after_ex.value = new_word;
	after_ex.focus();
}

/*去除首末多余空格并检验非法字符*/
function NoSpace(str,radio_value) {	
	var str_no_space = str.replace(/(^\s*)|(\s*$)/g,"");//去除首末多余空格
	var reg = /^[0-9a-zA-Z\u4E00-\u9FA5\s\/:：;；、\(\)（）\-\_\·]+$/;   /*支持中英文及以下几类特殊字符:空格，·，、,/,中英文状态下的冒号，分号，圆弧号,连接符*/
	var new_str="";
	if(reg.test(str_no_space)) {
		str_no_space = str_no_space.replace(/\s{2,}/g," ");//将多个空格替换成一个
		var ex_space = new Array;
/* 		ex_space_before = ("\：","\：","\（","\）");
		ex_space_after = (":",";","(",")");
		for(i=0;i<ex_space.length;i++) {
			str_no_space =str_no_space.replace(new RegExp(ex_space[i],"g"),ex_space_after[i]);
		} */		
		new_str= Rule(str_no_space,radio_value);
	}else {
		alert("您填入的文字中包含英文或非法字符，请查验后再次填写");
	}
	return new_str;
}

/*排版规则*/
function Rule(rule_str,rad_value) {
	var reg0 = /\/*/g;
	var arr1 = new Array;
	if(rad_value == 1) { 
		if(reg0.test(rule_str)) {
			var arr1 = rule_str.split("/");
		}else {
			arr1[0] = rule_str;
		}		
		var new_arr=new Array;
		var reg1 = /\s+/;
		var new_arr_str = new Array;
		for(i=0;i<arr1.length;i++) {			
			if(reg1.test(arr1[i])) {
				var arr2 = arr1[i].split(" ");				
				var arr2_pop = arr2.pop();
				var new_pop_str=arr2.join("、");
				var new_guy = new_pop_str+"/"+arr2_pop;
				new_arr_str[i] = new_guy;				
			}else {
				new_arr_str[i] = arr1[i]; 
			}
		}
		if(new_arr_str.length>1) {
			var after_str = new_arr_str.join("；");
		}else {
			var after_str = new_arr_str[0];
		}
	}else if(rad_value == 2) {
		rule_str = rule_str.replace(/\:+/g,":");
		if(reg0.test(rule_str)) {
			arr1 = rule_str.split("/");
		}else {
			arr1[0] = rule_str;
		}		
		var new_arr=new Array;
		for(i=0;i<arr1.length;i++) {
			var reg2 = /:/g;				
			if(reg2.test(arr1[i])) {
				var arr2 = arr1[i].split(":");
				var new_guy=arr2[1]+"/"+arr2[0];				
				new_arr[i]=new_guy;
			}else {
				new_arr[i] = arr1[i];
			}
		}
		var after_str=new_arr.join("；");
		after_str=after_str.replace(/\s+/g,"、");
	}else if(rad_value == 3) {
		rule_str=rule_str.replace(/\s{2,}/g," ");
		if(reg0.test(rule_str)) {
			arr1 = rule_str.split("/");
		}else {
			arr1[0] = rule_str;
		}		
		var reg3 = /\s+/g;
		var new_arr_str=new Array;		
		for(i=0;i<arr1.length;i++) {
			if(reg3.test(arr1[i])) {				
				var arr2 = arr1[i].split(" ");
				var del = arr2.splice(0,1);
				if(arr2.length>1) {
					var new_del_str=arr2.join("、");
					alert(new_del_str+"1");
				}else {
					var new_del_str=arr2[0];
					alert(new_del_str+"2");
				}				
				var new_guy = new_del_str + "/" + del;
				//alert(new_guy);
				new_arr_str[i] = new_guy;
			}else {
				new_arr_str[i] = arr1[i]; 
			}			
		}
		var after_str = new_arr_str.join("；");
			
	}else if(rad_value==4) {
		if(reg0.test(rule_str)) {
			arr1 = rule_str.split("/");
		}else {
			arr1 = rule_str;
		}
		var reg4= /\([^\)]*\)/g;
		var new_arr_str=new Array;
		for(i=0;i<arr1.length;i++) {			
			if(reg4.test(arr1[i])) {
				var del=arr1[i].match(reg3)[0];
				del=del.substring(1,del.length-1);
				var arr2 = arr1[i].replace(/\([^\)]*\)/g,"");
				var new_guy = del+"："+arr2;
				new_arr_str[i] = new_guy;
			}else {
					new_arr_str[i] = arr1[i]; 
			}			
		}
		var after_str = new_arr_str.join("；");
		after_str=after_str.replace(/\s+/g,"");
	} else if(rad_value==5) {
		rule_str=rule_str.replace(/\/+/g,"；");
		rule_str=rule_str.replace(/\s+/g,"：");
		var after_str = rule_str;
	}	
	return after_str;
}

/* 清空原样式区 */
function CleanBefore() {
	document.getElementById("before_text").value = "";
}

/* after */
/* 一键清空 */
function CleanAll() {
	document.getElementById("pre_text").value = "";
	document.getElementById("before_text").value = "";
	document.getElementById("after_text").value = "";
	document.getElementById("rule_radio3").checked = "true";
	var focus_now = document.getElementById("before_text");
	focus_now.focus();
}