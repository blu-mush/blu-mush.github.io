// blu mush 連結資料
// 新歌上架、換連結，只要改這個檔案就好，不用動版面。

export const BAND = {
  name: 'blu mush',
  tagline: '泥好 這裡是布嚕粥',
  email: 'blublumush@gmail.com',
};

// 頁首社群圖示（icon 對應 js/icons.js 裡的名稱；沒有的就用 label 文字）
export const SOCIALS = [
  { label: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/blumushh/' },
  { label: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/@blumushh' },
  { label: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/p/blu-mush-61569757820129/' },
  { label: 'Email', icon: 'mail', url: 'mailto:blublumush@gmail.com' },
];

// 發行作品（由新到舊）
// platforms：主要平台，直接顯示
// more：其他平台，收在「更多平台」裡
// lyrics：對應 js/lyrics.js 的 key
export const RELEASES = [
  {
    id: 'light-on',
    title: 'light on',
    kind: 'single',
    date: '2026.07.20',
    cover: 'assets/img/cover-light-on.jpg',
    lyrics: 'light-on',
    platforms: [
      { label: 'Spotify', icon: 'spotify', url: 'https://open.spotify.com/album/6SXvc4an32nH6Yitlo35Ii' },
      { label: 'Apple Music', icon: 'applemusic', url: 'https://music.apple.com/tw/album/light-on-single/6790802054' },
      { label: 'YouTube Music', icon: 'youtubemusic', url: 'https://music.youtube.com/playlist?list=OLAK5uy_npp9nZ60KnN1iWZxoBocDKTMi0He6lHyg' },
      { label: 'KKBOX', url: 'https://kkbox.fm/1aK9Z3' },
    ],
    more: [
      { label: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/playlist?list=OLAK5uy_npp9nZ60KnN1iWZxoBocDKTMi0He6lHyg' },
      { label: 'TIDAL', icon: 'tidal', url: 'https://tidal.com/album/543008639' },
      { label: 'Deezer', url: 'https://www.deezer.com/album/1028964082' },
    ],
  },
  {
    id: 'cross-the-still',
    title: 'cross the still',
    kind: '',
    date: '2026.07.22',
    cover: 'assets/img/cover-cross-the-still.jpg',
    lyrics: 'cross-the-still',
    platforms: [
      { label: 'Spotify', icon: 'spotify', url: 'https://open.spotify.com/track/6bQCEXf2Fzdvng9RsVBj0I' },
      { label: 'Apple Music', icon: 'applemusic', url: 'https://music.apple.com/tw/album/cross-the-still/6785783881?i=6785783888' },
      { label: 'YouTube Music', icon: 'youtubemusic', url: 'https://music.youtube.com/watch?v=py7xVwr1YTQ' },
      { label: 'KKBOX', url: 'https://www.kkbox.com/tw/tc/song/4nJjOGhI3TYuqlD6ca' },
    ],
    more: [
      { label: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/watch?v=py7xVwr1YTQ' },
    ],
  },
  {
    id: 'wanderlust',
    title: 'wanderlust',
    kind: 'demo',
    date: '',
    cover: 'assets/img/cover-wanderlust.jpg',
    lyrics: 'wanderlust',
    platforms: [
      { label: 'StreetVoice', url: 'https://streetvoice.com/blumush/songs/804848/' },
      { label: 'YouTube', icon: 'youtube', url: 'https://youtu.be/x6PejdHdA7k' },
      { label: 'Bandcamp', icon: 'bandcamp', url: 'https://blumush.bandcamp.com/track/wanderlust' },
    ],
    more: [],
  },
];

// 現場影片
export const LIVE = [
  { title: 'i hear', where: 'Live at The Wall · No Stage, No____', url: 'https://youtu.be/V_Ab0tycloo', thumb: 'assets/img/live-V_Ab0tycloo.jpg' },
  { title: 'caterpillar', where: 'Live at Revolver', url: 'https://youtu.be/YCtvdZYeajU', thumb: 'assets/img/live-YCtvdZYeajU.jpg' },
  { title: 'detoss (demo)', where: 'Recorded at MoriSound Studio', url: 'https://youtu.be/ShZ95dt82Pc', thumb: 'assets/img/live-ShZ95dt82Pc.jpg' },
];

// 尚未發行、只放歌詞的歌
export const LYRICS_ONLY = [
  { title: 'Why Always Like You Just Know', lyrics: 'why-always' },
  { title: 'i hear', lyrics: 'i-hear' },
  { title: 'detoss', lyrics: 'detoss' },
];

// 頁尾：所有平台
export const EVERYWHERE = [
  { label: 'Spotify', url: 'https://open.spotify.com/album/6SXvc4an32nH6Yitlo35Ii' },
  { label: 'Apple Music', url: 'https://music.apple.com/tw/album/light-on-single/6790802054' },
  { label: 'YouTube', url: 'https://www.youtube.com/@blumushh' },
  { label: 'KKBOX', url: 'https://kkbox.fm/1aK9Z3' },
  { label: 'StreetVoice', url: 'https://streetvoice.com/blumush/' },
  { label: 'Bandcamp', url: 'https://blumush.bandcamp.com/' },
  { label: 'SoundCloud', url: 'https://soundcloud.com/blumush-tw' },
];

export const LYRICS_CREDIT = 'lyrics written by mato ꩜';

// ---------- about ----------
// 來源：Drive「blu mush Profile(jpn/eng)」
export const ABOUT = {
  zh: [
    'blu mush 是一個揉合了 Shoegaze、Dream Pop 與 Alternative Rock 元素與特徵的四件式搖滾樂團。',
    '2024 年誕生於台北，四位同處大三階段的摯友，在密切的日常互動中，總能不斷碰撞出無數的音樂靈感。',
    '他們深受 Slowdive 與 Fuguko 等樂團影響，卻又保有屬於年輕世代獨特的新鮮感與溫度。',
    '聲響的構築，吉他細緻的殘響與破音建構起巨大而包覆的音牆，不穩定但有機的 Feedback；沉穩的貝斯旋律精準地刻劃歌曲的骨幹；加上極具個人風格的爵士鼓；以及主唱空靈輕柔的細語穿梭其中，blu mush 的音樂總能令人置身於迷茫的霧靄中，卻因為凝視，而透出一絲暖陽。',
  ],
  en: [
    'blu mush is a four-piece rock band that blends elements of Shoegaze, Dream Pop, and Alternative Rock.',
    'Formed in Taipei in 2024, blu mush grew from the friendship of four kindred souls, whose close daily moments quietly blossomed into music and an endless flow of inspiration.',
    'In their sonic landscapes, shimmering guitar reverbs and distortion build a vast, enveloping wall of sound, layered with unstable yet organic feedback. Beneath it, steady basslines carve out the backbone of each song, accompanied by drumming with a distinct personal touch. Floating through it all is the vocalist’s soft, ethereal whisper.',
    'Deeply influenced by bands like Slowdive and Fuguko, blu mush carries those inspirations forward while retaining the freshness and warmth unique to their generation. blu mush’s music feels like gazing into a drifting haze of mist, where soft rays of sunlight unfold across the layers of sound.',
  ],
  ja: [
    'blu mush（ブルマシ）は、Shoegaze、Dream Pop、Alternative Rockの要素を融合させた4ピースロックバンド。',
    '2024年、台北にて結成された。大学三年生という同じ時期を過ごす4人の親友たちが、日常の密接な交流の中で絶えず音楽的インスピレーションを生み出している。',
    'SlowdiveやFugukoといったバンドから深い影響を受けながらも、若い世代ならではの新鮮さと温もりを併せ持つ。',
    '繊細なリバーブとディストーションをまとったギターが、巨大で包み込むような音の壁を生み出し、不安定でありながら有機的なフィードバックを響かせる。',
    '落ち着いたベースの旋律が楽曲の骨格を刻み、個性的なドラムと、透明感のあるボーカルの柔らかな囁きがその間を漂う。ブルマシの音楽は、聴く者を深い霧の中へと誘う。しかし、その奥を見つめたとき、そこには一筋の暖かな光が差し込んでいる。',
  ],
};

export const MEMBERS = [
  { name: 'mato liu', role: 'vocal, guitar' },
  { name: 'hiko', role: 'guitar' },
  { name: 'Yvette chen', role: 'bass' },
  { name: 'Isaac yang', role: 'drums' },
];

// ---------- shows ----------
// next：下一場（沒有就留 null，頁面會顯示「追蹤 IG」）
// past：過去演出，由新到舊；poster 沒有就留空
export const NEXT_SHOW = null;

export const PAST_SHOWS = [
  { date: '2026.07.05', title: '肉聲菩薩', venue: 'THE WALL LIVE HOUSE', with: '河豚子、打倒三明治', poster: 'assets/img/shows/2026-07-05-the-wall.jpg' },
  { date: '2026.01.16', title: 'Drawn into Ripples', venue: 'Revolver', with: '畫室 The WLTZ、我夢見長頸鹿對我說', poster: 'assets/img/shows/2026-01-16-drawn-into-ripples.jpg' },
  { date: '4.21', title: '', venue: 'Revolver', with: 'murmurblurblur、meemeemaomao', poster: 'assets/img/shows/04-21-revolver.jpg' },
  { date: '2025.01.16', title: 'Drawn into Ripples', venue: 'Revolver', with: '彼羅蜜、The Whisperer', poster: 'assets/img/shows/2025-01-16-drawn-into-ripples.jpg' },
];

// ---------- 毛片 ----------
export const ROLL = Array.from({ length: 16 }, (_, i) => `assets/img/roll/${String(i + 1).padStart(2, '0')}.jpg`);

// ---------- 周邊 ----------
export const MERCH = {
  note: '現場演出時販售',
  items: ['貼紙', 'cross the still 專輯'],
};

// ---------- 霧上的字 ----------
// 像用手指在起霧的玻璃上寫的字，散落在霧裡
export const FOG_WRITING = [
  'When you leave the light on',
  'I see from a distant star',
  'cross the still',
  'a silent place',
  'i hear',
  'wander in the biggest lawn',
];

// ---------- 突然冒出來的話 ----------
// 來源：LINE 群組「blu mush道路平安」常用詞，加上歌詞片段
// 刻意沒放髒話和彼此的綽號、本名；想加就直接加進陣列
export const CHATTER = [
  '超好笑', '笑死', '真假', '我快笑死', '好ㄚ', '好ㄌ', '到ㄌ', '要ㄇ', '真ㄉ',
  '嗯嗯', '咦', '喔喔', '對啊', '對阿', '好阿', '行', '可', '感覺可以', '問問看',
  '好耶', '嗚呼', '阿門', '嘻嘻', '呵呵', '度啊', '嗯哼', '不知道誒', '好的',
  '布嚕粥', '椰絲', '今天練團嗎', '幾點', '團費', '取票', '😭',
  'When you leave the light on', 'cross the still', 'not the why and not the who',
  'hay, hay', 'i hear', 'do u ?', 'oh shit.', 'the water goes to ears',
];
