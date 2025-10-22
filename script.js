
function randomNumber(max,min) {
     return Math.floor(Math.random() * (max-min)) + min;} 


const app = Vue.createApp ({
    data() {
        return {
            bilgiGelenDeger: randomNumber(13,1),
            isim:'Sende zar at sende kazan!!', 
            bilgisayar: 100,
            kullanici: 100,
            kazanan: null,
            btnSayac: 0,
            btnHazir: false,
            canEkleSayac: 0,
            alertKart: true,
        };
    },
    methods: {
        bilgisayarAtak(){
            this.kullanici -= this.bilgiGelenDeger; 
        },
        kullaniciAtak(){
            this.btnSayac++;
            const gelenDeger = randomNumber(13,1);
            this.bilgisayar -= gelenDeger;
            this.bilgisayarAtak();
            this.superBtnKontrol()
        },
        canEkle(){
            this.canEkleSayac++,
            this.btnSayac++;
            if(this.kullanici > 100 || this.kullanici == 100){
                this.kullanıcı=100;
            }else if (this.kullanici < 100 && this.kullanici > 0 ){
            const gelenDeger = randomNumber(16,3);
            this.kullanici += gelenDeger;
            this.bilgisayarAtak();
            this.superBtnKontrol();
            this.canEklebtnKontrol();
            }
        },
        kalkan(){
            this.btnSayac++;
            const kalkanKorumasi = this.bilgiGelenDeger % 2;
            this.kullanici -= kalkanKorumasi;
            this.superBtnKontrol()
        },
        superSaldiri(){
            this.btnHazir = false;
            this.btnSayac++;
            const gelenDeger = randomNumber(16,3)
            this.bilgisayar -= gelenDeger;
            this.bilgisayarAtak();
            this.superBtnKontrol();
            this.btnHazir=true;
            this.btnSayac=0;
        },
        yeniOyun(){
            this.bilgisayar= 100;
            this.kullanici= 100;
            this.kazanan= null;
            this.canEkleSayac= 0;
            this.btnHazir=false;
            this.btnSayac=0;
        },
        superBtnKontrol(){
            if(this.btnSayac > 0 && this.btnSayac % 4 === 0 ){
                this.btnHazir=false;
            }
        },
    },
    computed: {
        bilgisayarBarValue(){
           if(this.bilgisayar < 0) {
                return {width: '0%'};
            }else{
                return {width: this.bilgisayar + '%'};
            }
        },
        kullaniciBarValue(){
           if(this.kullanici < 0) {
                return {width: '0%'};
            }else if (this.kullanici > 100) {
                return {width: '100%'}
            }else{
                return {width: this.kullanici + '%'};
            }
        },
    },
    watch: {
        bilgisayar(value){
            if(value > 0 && this.kullanici <= 0){
                this.kazanan = 'bilgisayar';
            }else if(value <= 0 && this.kullanici <= 0){
                this.kazanan = 'beraber';
            }
        },
        kullanici(value){
            if(value > 0 && this.bilgisayar <= 0){
                this.kazanan='kullanici';
            }else if(value <= 0 && this.bilgisayar <=0){
                this.kazanan='beraber';
            }
        },
    },
});

app.mount('#app');