const countries = [
{ name: "대한민국", emoji: "🇰🇷" },
{ name: "일본", emoji: "🇯🇵" },
{ name: "중국", emoji: "🇨🇳" },
{ name: "미국", emoji: "🇺🇸" },
{ name: "캐나다", emoji: "🇨🇦" },
{ name: "멕시코", emoji: "🇲🇽" },
{ name: "브라질", emoji: "🇧🇷" },
{ name: "아르헨티나", emoji: "🇦🇷" },
{ name: "칠레", emoji: "🇨🇱" },
{ name: "콜롬비아", emoji: "🇨🇴" },
{ name: "페루", emoji: "🇵🇪" },
{ name: "베네수엘라", emoji: "🇻🇪" },
{ name: "영국", emoji: "🇬🇧" },
{ name: "프랑스", emoji: "🇫🇷" },
{ name: "독일", emoji: "🇩🇪" },
{ name: "이탈리아", emoji: "🇮🇹" },
{ name: "스페인", emoji: "🇪🇸" },
{ name: "포르투갈", emoji: "🇵🇹" },
{ name: "네덜란드", emoji: "🇳🇱" },
{ name: "벨기에", emoji: "🇧🇪" },
{ name: "스위스", emoji: "🇨🇭" },
{ name: "오스트리아", emoji: "🇦🇹" },
{ name: "스웨덴", emoji: "🇸🇪" },
{ name: "노르웨이", emoji: "🇳🇴" },
{ name: "덴마크", emoji: "🇩🇰" },
{ name: "핀란드", emoji: "🇫🇮" },
{ name: "폴란드", emoji: "🇵🇱" },
{ name: "체코", emoji: "🇨🇿" },
{ name: "헝가리", emoji: "🇭🇺" },
{ name: "그리스", emoji: "🇬🇷" },
{ name: "터키", emoji: "🇹🇷" },
{ name: "우크라이나", emoji: "🇺🇦" },
{ name: "러시아", emoji: "🇷🇺" },
{ name: "인도", emoji: "🇮🇳" },
{ name: "파키스탄", emoji: "🇵🇰" },
{ name: "방글라데시", emoji: "🇧🇩" },
{ name: "네팔", emoji: "🇳🇵" },
{ name: "스리랑카", emoji: "🇱🇰" },
{ name: "태국", emoji: "🇹🇭" },
{ name: "베트남", emoji: "🇻🇳" },
{ name: "말레이시아", emoji: "🇲🇾" },
{ name: "싱가포르", emoji: "🇸🇬" },
{ name: "인도네시아", emoji: "🇮🇩" },
{ name: "필리핀", emoji: "🇵🇭" },
{ name: "몽골", emoji: "🇲🇳" },
{ name: "카자흐스탄", emoji: "🇰🇿" },
{ name: "우즈베키스탄", emoji: "🇺🇿" },
{ name: "키르기스스탄", emoji: "🇰🇬" },
{ name: "타지키스탄", emoji: "🇹🇯" },
{ name: "투르크메니스탄", emoji: "🇹🇲" },
{ name: "아랍에미리트", emoji: "🇦🇪" },
{ name: "사우디아라비아", emoji: "🇸🇦" },
{ name: "이란", emoji: "🇮🇷" },
{ name: "이라크", emoji: "🇮🇶" },
{ name: "이스라엘", emoji: "🇮🇱" },
{ name: "이집트", emoji: "🇪🇬" },
{ name: "남아프리카공화국", emoji: "🇿🇦" },
{ name: "나이지리아", emoji: "🇳🇬" },
{ name: "케냐", emoji: "🇰🇪" },
{ name: "에티오피아", emoji: "🇪🇹" },
{ name: "모로코", emoji: "🇲🇦" },
{ name: "호주", emoji: "🇦🇺" },
{ name: "뉴질랜드", emoji: "🇳🇿" },
{ name: "통가", emoji: "🇹🇴" },
{ name: "피지", emoji: "🇫🇯" },
{ name: "사모아", emoji: "🇼🇸" },
{ name: "아이슬란드", emoji: "🇮🇸" },
{ name: "아일랜드", emoji: "🇮🇪" },
{ name: "루마니아", emoji: "🇷🇴" },
{ name: "불가리아", emoji: "🇧🇬" },
{ name: "크로아티아", emoji: "🇭🇷" },
{ name: "세르비아", emoji: "🇷🇸" },
{ name: "슬로베니아", emoji: "🇸🇮" },
{ name: "슬로바키아", emoji: "🇸🇰" },
{ name: "리투아니아", emoji: "🇱🇹" },
{ name: "라트비아", emoji: "🇱🇻" },
{ name: "에스토니아", emoji: "🇪🇪" }
];

let currentQuiz = null;
let timeout = null;

function getInitials(str) {
  const chosung = [
    "ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ",
    "ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"
  ];
  let result = "";
  for (let char of str) {
    let code = char.charCodeAt(0) - 44032;
    if (code >= 0 && code <= 11171) {
      result += chosung[Math.floor(code / 588)];
    } else {
      result += char;
    }
  }
  return result;
}

function response(room, msg, sender, isGroupChat, replier) {

  if (msg === "!국가퀴즈") {
    if (currentQuiz !== null) {
      replier.reply("이미 진행중임");
      return;
    }

    const random = countries[Math.floor(Math.random() * countries.length)];
    currentQuiz = random;

    replier.reply("🌍 국가를 맞혀라!\n" + random.emoji + "\n1분 안에 맞혀라");

    timeout = setTimeout(() => {
      if (currentQuiz !== null) {
        replier.reply("ㅋ 틀림\n정답은 " + currentQuiz.name);
        currentQuiz = null;
      }
    }, 60000);
  }

  else if (msg.startsWith("!정답 ")) {
    if (currentQuiz === null) return;

    const answer = msg.replace("!정답 ", "").trim();

    if (answer === currentQuiz.name) {
      clearTimeout(timeout);
      replier.reply("정답!");
      currentQuiz = null;
    } else {
      replier.reply("ㅋ 틀림");
    }
  }

  else if (msg === "!힌트") {
    if (currentQuiz === null) return;
    replier.reply("힌트: " + getInitials(currentQuiz.name));
  }

  else if (msg === "!포기") {
    if (currentQuiz === null) return;
    clearTimeout(timeout);
    replier.reply("정답은 " + currentQuiz.name);
    currentQuiz = null;
  }
}
