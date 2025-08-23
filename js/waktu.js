 function checkTime(i) {
    return (i < 10) ? "0" + i : i;
  }

  async function waktuSholat() {
    const today = new Date();
    const year = today.getFullYear();
    const month = checkTime(today.getMonth() + 1);
    const date = checkTime(today.getDate());

    const fullDate = `${year}-${month}-${date}`;
    const h = checkTime(today.getHours());
    const m = checkTime(today.getMinutes());
    const s = checkTime(today.getSeconds());
    const nowTime = `${h}:${m}`;

    document.getElementById("jam").innerHTML = `${h}:${m}:${s}`;

    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
      "Agustus", "September", "Oktober", "November", "Desember"];
    document.getElementById("tanggal").innerHTML =
      `${hari[today.getDay()]}, ${today.getDate()} ${bulan[today.getMonth()]} ${today.getFullYear()}`;

    
    try {
      const response = await fetch(`https://api.myquran.com/v2/sholat/jadwal/0506/${year}/${month}/${date}`);
      const data = await response.json();
      const jadwal = data.data.jadwal;

      const times = {
        fajr: jadwal.subuh,
        sunrise: jadwal.terbit,
        dhuhr: jadwal.dzuhur,
        asr: jadwal.ashar,
        maghrib: jadwal.maghrib,
        isha: jadwal.isya,
      };

      document.getElementById("subuh").innerText = times.fajr;
      document.getElementById("terbit").innerText = times.sunrise;
      document.getElementById("zuhur").innerText = times.dhuhr;
      document.getElementById("ashar").innerText = times.asr;
      document.getElementById("maghrib").innerText = times.maghrib;
      document.getElementById("isya").innerText = times.isha;

      const highlight = (id, condition) => {
        document.getElementById(id).style.backgroundColor = condition ? "red" :"#ffffffb6";
      };

      highlight("csubuh", nowTime >= times.fajr && nowTime < times.sunrise);
      highlight("cterbit", nowTime >= times.sunrise && nowTime < times.dhuhr);
      highlight("czuhur", nowTime >= times.dhuhr && nowTime < times.asr);
      highlight("cashar", nowTime >= times.asr && nowTime < times.maghrib);
      highlight("cmaghrib", nowTime >= times.maghrib && nowTime < times.isha);
      highlight("cisya", nowTime >= times.isha);

      const waktuAzan = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
      waktuAzan.forEach(w => {
        if (nowTime === times[w].slice(0, 5)) {
          $('#ModalAzan').modal('show');
          setTimeout(() => $('#ModalAzan').modal('hide'), 60000);
        }
      });

    } catch (error) {
      console.error("Gagal mengambil data waktu sholat:", error);
    }
  }

  setInterval(waktuSholat, 1000);