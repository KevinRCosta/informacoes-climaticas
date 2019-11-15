function getClima() {
    $.ajax({
        method: 'get',
        crossDomain: true,
        url: 'http://api.openweathermap.org/data/2.5/weather?id=3468879&appid=62cb9f2cd2e669ec733f70b9d10409b8',
        dataType: 'json',
        success: function (data) {
            temperatura = Math.round(data.main.temp - 273);
            var tempFormatada = temperatura.toFixed(2).split(',');
            $('#temperatura').html(tempFormatada+"º");
            
            pressaoAr = data.main.pressure;
            $('#pressaoAr').html(pressaoAr + "hPa");
            
            umidade = data.main.humidity;
            $('#umidade').html(umidade + "%");
            
            var dataAmanhecer = new Date(data.sys.sunrise*1000);
            var descDataAmanhecer = dataAmanhecer.getHours()+':'+dataAmanhecer.getMinutes();
            $('#amanhecer').html(descDataAmanhecer);
            
            var dataAmanhecer = new Date(data.sys.sunset*1000);
            var descDataAmanhecer = dataAmanhecer.getHours()+':'+dataAmanhecer.getMinutes();
            $('#anoitecer').html(descDataAmanhecer);
            
            var icone = data.weather[0].icon;
            var caminhoIcone = 'img/icones/'+icone+'.png';
            $('#icone').attr('src', caminhoIcone);
            
            descricao = traduzirDescricao(data.weather[0].description);
            $('#situacao').html(descricao);
            
            temp_max = Math.round(data.main.temp_max - 273);
            $('#temp_max').html(temp_max + "º");
            
            temp_min = Math.round(data.main.temp_min - 273);
            $('#temp_min').html(temp_min + "º");
            
            wind = data.wind.speed;
            $('#wind').html(wind + "Km/h");
            
            sunrise = data.sys.sunrise;
            $('#sunrise').html(sunrise);
            
            sunset = data.sys.sunset;
            $('#sunset').html(sunset);

        },
        error: function (argument) {
            alert('Falha ao obter dados!');
        }
    });
}

function traduzirDescricao(descricao) {
    descricaoTraduzida = "";

    if (descricao == "clear sky") {
        descricaoTraduzida = "Céu limpo";
    } else if (descricao == "few clouds") {
        descricaoTraduzida = "Poucas nuvens";
    } else if (descricao == "scattered clouds") {
        descricaoTraduzida = "Nuvens dispersas";
    } else if (descricao == "broken clouds") {
        descricaoTraduzida = "Nuvens carregadas";
    } else if (descricao == "shower rain") {
        descricaoTraduzida = "Chuva molha bobo";
    } else if (descricao == "rain") {
        descricaoTraduzida = "Chuva";
    } else if (descricao == "thunderstorm") {
        descricaoTraduzida = "Tempestade";
    } else if (descricao == "snow") {
        descricaoTraduzida = "Neve";
    } else if (descricao == "mist") {
        descricaoTraduzida = "Misto";
    }
}

window.onload = function () {
    getClima();
};