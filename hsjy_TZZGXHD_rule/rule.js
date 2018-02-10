/*排版*/
function Exchange() {
	var old_word=document.getElementById("old").value;
	var radio_value = document.getElementsByName("rule_radio"); /*获取单选按钮的值*/
	for(i=0;i<radio_value.length;i++) {
		if(radio_value[i].checked==true) {
			var ra_val = radio_value[i].value;
			var new_word=NoSpace(old_word,ra_val);
		}
	}		
	document.getElementById("new").innerHTML=new_word;	
}

/*去除首末多余空格并检验非法字符*/
function NoSpace(str,radio_value) {
	var str_no_space = str.replace(/(^\s*)|(\s*$)/g,"");//去除首末多余空格
	var reg=/^[\u4E00-\u9FA5\s\/:：;；、\(\)（）\-\_\·]+$/;   /*支持中英文及以下几类特殊字符:空格，·，、,/,中英文状态下的冒号，分号，圆弧号,连接符*/
	//var reg=/^[a-zA-Z\u4E00-\u9FA5\s\/:：;；、()（）\-\_\·]+$/;   /*支持中英文及以下几类特殊字符:空格，·，、,/,中英文状态下的冒号，分号，圆弧号,连接符*/
	if(reg.test(str_no_space)) {
		var str_no_space = str_no_space.replace(/\s+/g," ");//将多个空格替换成一个
		var str_no_space = str_no_space.replace(/\;/g,"；");
		var str_no_space = str_no_space.replace(/\：/g,":");
		var str_no_space = str_no_space.replace(/\（/g,"(");
		var str_no_space = str_no_space.replace(/\）/g,")");
		//var new_str = str_no_space;
		var new_str= Rule(str_no_space,radio_value);
	}else {
		alert("您填入的文字中包含英文或非法字符，请查验后再次填写");
		var new_str = " ";
	}
	return new_str;
}

/*排版规则*/
function Rule(rule_str,rad_value) {
	var reg0 = /\/+/;
	if(rad_value==1) {
		var arr1 = rule_str.split("/");
		var new_arr=new Array;
		for(i=0;i<arr1.length;i++) {
			var reg1 = /:/;				
			if(reg1.test(arr1[i])) {
				var arr2 = arr1[i].split(":");
				var new_guy=arr2[1]+"/"+arr2[0];				
				new_arr[i]=new_guy;
			}else {
				new_arr[i] = arr1[i];
			}
		}
		var new_str=new_arr.join("；");
		new_str=new_str.replace(/\s+/g,"、");		
	}else if(rad_value==2) {
		var arr1 = rule_str.split("/");
		var reg2 = /\s+/;
		var new_arr_str=new Array;
		for(i=0;i<arr1.length;i++) {			
			if(reg2.test(arr1[i])) {				
				var arr2 = arr1[i].split(" ");
				var del = arr2.splice(0,1);
				var new_del_str=arr2.join("、");
				var new_guy = new_del_str + "/" + del;
				new_arr_str[i] = new_guy;
			}else {
				new_arr_str[i] = arr1[i]; 
			}			
		}
		var new_str = new_arr_str.join("；");			
	}else if(rad_value==3) {
		if(reg0.test(rule_str)) {
			var arr1 = rule_str.split("/");
		}else {
			var arr1 = rule_str;
		}
		var reg3= /\([^\)]*\)/g;
		var new_arr_str=new Array;
		for(i=0;i<arr1.length;i++) {			
			if(reg3.test(arr1[i])) {
				var del=arr1[i].match(reg3)[0];
				del=del.substring(1,del.length-1);
				var arr2 = arr1[i].replace(/\([^\)]*\)/g,"");
				var new_guy = del+"："+arr2;
				new_arr_str[i] = new_guy;
			}else {
					new_arr_str[i] = arr1[i]; 
			}			
		}
		var new_str = new_arr_str.join("；");
		new_str=new_str.replace(/\s+/g,"");
	} else if(rad_value==4) {
		rule_str=rule_str.replace(/\/+/g,"；");
		rule_str=rule_str.replace(/\s+/g,"：");
		var new_str = rule_str;
	}
	
	
	return new_str;
}