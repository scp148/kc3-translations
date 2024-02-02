(function(){
    var EN_JSON = {};
    var XX_JSON = {};
    var NEW_JSON = {};
    var i;

    $(document).ready(function(){

        // 当一个文本框滚动时，更新另一个文本框的滚动位置
        $('#enjson').on('scroll', function(){
            $('#newjson').scrollTop($(this).scrollTop());
        });
        $('#newjson').on('scroll', function(){
            $('#enjson').scrollTop($(this).scrollTop());
        });

        $("#lang_submit").on("click", function(){
            var jsonFileName = $("#json_file").val() || "terms_extend.json";
            var languageCode = $("#lang_code").val();

            // 获取英文 JSON 数据
            EN_JSON = JSON.parse($.ajax({
                async: false,
                url: "https://raw.githubusercontent.com/scp148/kc3-translations/master/data/en/" + jsonFileName,
            }).responseText);

            // 显示未翻译的英文文本
            $("#enjson").val(JSON.stringify(EN_JSON, null, "\t"));

			for(i in EN_JSON){
				if(typeof EN_JSON[i] === 'object' && EN_JSON[i] !== null){
					// 如果是对象，则遍历对象的每个属性
					for(var key in EN_JSON[i]){
						if(EN_JSON[i].hasOwnProperty(key)){
							// 当文件名是 quests.json 且属性名为 code 时，跳过
							if(jsonFileName === "quests.json" && key === "code") {
								continue;
							}
							EN_JSON[i][key] = "*****" + EN_JSON[i][key];
						}
					}
				} else {
					// 如果不是对象，直接添加前缀
					EN_JSON[i] = "*****" + EN_JSON[i];
				}
			}

            // 获取指定语言的 JSON 数据
            XX_JSON = JSON.parse($.ajax({
                async: false,
                url: "https://raw.githubusercontent.com/scp148/kc3-translations/master/data/" + languageCode + "/" + jsonFileName,
            }).responseText);

            NEW_JSON = $.extend(true, EN_JSON, XX_JSON);

            // 显示合并后的 JSON 数据
            $("#newjson").val(JSON.stringify(NEW_JSON, null, "\t"));
            $("#newjson").css("background", "#dfd");
        });

        $(document).on("keyup", function(e){
            var NEWTL = $("#newjson").val();
            if(NEWTL === "") return true;
            try {
                JSON.parse(NEWTL);
                $("#newjson").css("background", "#dfd");
            } catch(ex) {
                $("#newjson").css("background", "#fdd");
            }
        });

    });

})();
