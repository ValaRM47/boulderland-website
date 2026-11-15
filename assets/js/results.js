/* results.js — comp-dashboard «results» page script. */
// nav scroll state
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});

const CAT_ORDER=['نونهالان A','نونهالان B','نوجوانان C','نوجوانان D'];

const OVERALL = {
  'نونهالان A':{
    'پسران':[
      {rank:1, name:'کارن شفیع زاده', number:206, m1:'تاپ', m2:'تاپ', pts:'3.16', prank:'1', f:'تاپ', time:'1.54'},
      {rank:2, name:'رایان امینی', number:231, m1:'تاپ', m2:'تاپ', pts:'3.16', prank:'1', f:'تاپ', time:'2.28'},
      {rank:3, name:'محمد یاسین نجفی', number:241, m1:'تاپ', m2:'34', pts:'4.9', prank:'4', f:'تاپ', time:'3.56'},
      {rank:4, name:'علي درويش زيدابادي', number:205, m1:'28+', m2:'تاپ', pts:'5.48', prank:'5', f:'تاپ', time:''},
      {rank:5, name:'کیاراد معدن کن', number:226, m1:'29+', m2:'تاپ', pts:'4.47', prank:'3', f:'45+', time:''},
      {rank:6, name:'نیکان حیاتی', number:220, m1:'28+', m2:'تاپ', pts:'5.48', prank:'5', f:'45+', time:''},
      {rank:7, name:'سام مرادی', number:238, m1:'28', m2:'تاپ', pts:'6.52', prank:'7', f:'45+', time:''},
      {rank:8, name:'سهراب شمیرانی', number:215, m1:'27+', m2:'تاپ', pts:'7.42', prank:'8', f:'45+', time:''},
      {rank:9, name:'هیراد ابراهیمی', number:227, m1:'28+', m2:'38', pts:'8.12', prank:'9', f:'', time:''},
      {rank:10, name:'مهدیار اعتدادی', number:216, m1:'15+', m2:'تاپ', pts:'10.49', prank:'10', f:'', time:''},
      {rank:11, name:'کوروش مومن مهربانی', number:207, m1:'28', m2:'32+', pts:'11.1', prank:'11', f:'', time:''},
      {rank:12, name:'محمد علمدارنژاد', number:217, m1:'15', m2:'تاپ', pts:'12.14', prank:'12', f:'', time:''},
      {rank:13, name:'هامون هراتی', number:211, m1:'27+', m2:'32+', pts:'12.63', prank:'13', f:'', time:''},
      {rank:14, name:'آراد جمشیدزاده', number:237, m1:'27+', m2:'32', pts:'13.47', prank:'14', f:'', time:''},
      {rank:15, name:'محمد پویا محبیان', number:230, m1:'18', m2:'39', pts:'13.78', prank:'15', f:'', time:''},
      {rank:16, name:'ارتین فرجیان', number:229, m1:'23', m2:'33', pts:'14.65', prank:'16', f:'', time:''},
      {rank:17, name:'آرین حسین زاده', number:224, m1:'26', m2:'32', pts:'15.47', prank:'17', f:'', time:''},
      {rank:18, name:'بابک زینالی سیلاب', number:234, m1:'26', m2:'31', pts:'16.6', prank:'18', f:'', time:''},
      {rank:19, name:'امیرحسین کلانتری', number:218, m1:'23', m2:'31', pts:'17.71', prank:'19', f:'', time:''},
      {rank:20, name:'دانیال جمینی', number:202, m1:'27', m2:'22+', pts:'18.38', prank:'20', f:'', time:''},
      {rank:21, name:'اریا کوشانفر', number:235, m1:'15+', m2:'22+', pts:'23.92', prank:'21', f:'', time:''},
      {rank:22, name:'كيان سليماني', number:201, m1:'15', m2:'30+', pts:'24.89', prank:'22', f:'', time:''},
      {rank:23, name:'محمد کسرا صفری', number:221, m1:'15', m2:'24+', pts:'25.48', prank:'23', f:'', time:''},
      {rank:24, name:'کیارش بختیاری هفت لنگ', number:239, m1:'14+', m2:'31', pts:'25.97', prank:'24', f:'', time:''},
      {rank:25, name:'رادمهر جمالی', number:209, m1:'19+', m2:'17+', pts:'26.15', prank:'25', f:'', time:''},
      {rank:26, name:'عباس علی نیک‌سرشت', number:210, m1:'15+', m2:'22', pts:'26.53', prank:'26', f:'', time:''},
      {rank:26, name:'سپهر فتحی', number:232, m1:'15+', m2:'22', pts:'26.53', prank:'26', f:'', time:''},
      {rank:26, name:'محمدحسن هنرمند', number:240, m1:'15+', m2:'22', pts:'26.53', prank:'26', f:'', time:''},
      {rank:29, name:'محمدیاسین جمالی', number:225, m1:'15', m2:'22+', pts:'27.69', prank:'29', f:'', time:''},
      {rank:29, name:'آریا رضاپور دارسرائی', number:228, m1:'15', m2:'22+', pts:'27.69', prank:'29', f:'', time:''},
      {rank:29, name:'سامیار محمدزاده', number:233, m1:'15', m2:'22+', pts:'27.69', prank:'29', f:'', time:''},
      {rank:32, name:'رادوین وحیدعصر', number:208, m1:'14+', m2:'22+', pts:'30.38', prank:'32', f:'', time:''},
      {rank:33, name:'امیرمهدی قشقائی', number:236, m1:'15', m2:'22', pts:'30.72', prank:'33', f:'', time:''},
      {rank:34, name:'محمدکسرا لکزائی فر', number:242, m1:'13', m2:'22+', pts:'31.43', prank:'34', f:'', time:''},
      {rank:35, name:'هیراد معصومی', number:204, m1:'15', m2:'19', pts:'32.13', prank:'35', f:'', time:''},
      {rank:36, name:'علی ادریسی حقیقی', number:214, m1:'15', m2:'18+', pts:'32.59', prank:'36', f:'', time:''},
      {rank:37, name:'علی حسینی آراسته', number:212, m1:'15', m2:'18', pts:'33.04', prank:'37', f:'', time:''},
      {rank:38, name:'سید مهراد حاج میری', number:213, m1:'6', m2:'22', pts:'36.44', prank:'38', f:'', time:''},
      {rank:39, name:'مهران آقاخان بابائی', number:203, m1:'14', m2:'17', pts:'38.23', prank:'39', f:'', time:''},
      {rank:40, name:'امير محمد سلاجقه', number:223, m1:'12+', m2:'17', pts:'39.25', prank:'40', f:'', time:''},
      {rank:41, name:'امیرعلی سهل البیع', number:222, m1:'11', m2:'11', pts:'40.74', prank:'41', f:'', time:''},
      {rank:42, name:'امیرعلی کردی', number:219, m1:'6', m2:'11', pts:'41.5', prank:'42', f:'', time:''},
    ],
    'دختران':[
      {rank:1, name:'آتوسا سامی', number:174, m1:'تاپ', m2:'تاپ', pts:'4.87', prank:'1', f:'تاپ', time:'2.23'},
      {rank:2, name:'زهرا بختیاریان', number:189, m1:'تاپ', m2:'تاپ', pts:'4.87', prank:'1', f:'تاپ', time:'4.57'},
      {rank:3, name:'آیلا راستی', number:171, m1:'تاپ', m2:'44', pts:'8.44', prank:'7', f:'تاپ', time:'3.01'},
      {rank:4, name:'الین رضوانی', number:151, m1:'تاپ', m2:'تاپ', pts:'4.87', prank:'1', f:'49', time:''},
      {rank:5, name:'نيروانا گل ارا', number:170, m1:'تاپ', m2:'45', pts:'7.55', prank:'6', f:'49', time:''},
      {rank:6, name:'کمندبالابومی', number:163, m1:'تاپ', m2:'تاپ', pts:'4.87', prank:'1', f:'45', time:''},
      {rank:7, name:'آترینا شغلی', number:161, m1:'تاپ', m2:'44', pts:'8.44', prank:'7', f:'45', time:''},
      {rank:8, name:'باران علی اکبریان', number:160, m1:'تاپ', m2:'45+', pts:'6.89', prank:'5', f:'44+', time:''},
      {rank:9, name:'نهال ناظری', number:155, m1:'تاپ', m2:'38+', pts:'9.5', prank:'9', f:'', time:''},
      {rank:9, name:'دلسا عاصمی', number:158, m1:'تاپ', m2:'38+', pts:'9.5', prank:'9', f:'', time:''},
      {rank:11, name:'درسا اکبرابادی', number:157, m1:'تاپ', m2:'38', pts:'10.45', prank:'11', f:'', time:''},
      {rank:12, name:'بهار محمد زاده کوثری', number:179, m1:'تاپ', m2:'36+', pts:'11.32', prank:'12', f:'', time:''},
      {rank:12, name:'آریستا عظیمی خبازان', number:180, m1:'تاپ', m2:'36+', pts:'11.32', prank:'12', f:'', time:''},
      {rank:14, name:'رها خوش عمل', number:159, m1:'تاپ', m2:'36', pts:'12.33', prank:'14', f:'', time:''},
      {rank:15, name:'محیا عباسی', number:186, m1:'تاپ', m2:'34', pts:'13.78', prank:'15', f:'', time:''},
      {rank:16, name:'ستیامیرزایی', number:187, m1:'تاپ', m2:'33', pts:'14.29', prank:'16', f:'', time:''},
      {rank:16, name:'دینا احمدزاده', number:197, m1:'تاپ', m2:'33', pts:'14.29', prank:'16', f:'', time:''},
      {rank:18, name:'لیا پوروطن', number:195, m1:'47+', m2:'38', pts:'14.97', prank:'18', f:'', time:''},
      {rank:19, name:'حلمامحمدی', number:168, m1:'تاپ', m2:'32+', pts:'15.1', prank:'19', f:'', time:''},
      {rank:20, name:'نورا امان الهی', number:190, m1:'47', m2:'36', pts:'18.55', prank:'20', f:'', time:''},
      {rank:20, name:'اریکا مهدی منش', number:191, m1:'47', m2:'36', pts:'18.55', prank:'20', f:'', time:''},
      {rank:22, name:'آرام بیگدلی', number:169, m1:'47+', m2:'32+', pts:'21.63', prank:'22', f:'', time:''},
      {rank:23, name:'هانا یوسفی', number:152, m1:'38+', m2:'35', pts:'23.16', prank:'23', f:'', time:''},
      {rank:23, name:'نیروانا درزلو', number:183, m1:'38+', m2:'35', pts:'23.16', prank:'23', f:'', time:''},
      {rank:25, name:'ترنج خاکپور', number:177, m1:'39+', m2:'32+', pts:'25.46', prank:'25', f:'', time:''},
      {rank:26, name:'تینا شهسواری', number:196, m1:'41+', m2:'32', pts:'25.69', prank:'26', f:'', time:''},
      {rank:27, name:'حلما باباصفری', number:153, m1:'40', m2:'32', pts:'26.48', prank:'27', f:'', time:''},
      {rank:28, name:'بارانا سلطانی منش', number:162, m1:'43', m2:'31+', pts:'26.49', prank:'28', f:'', time:''},
      {rank:29, name:'گندم شجاعی', number:164, m1:'38+', m2:'32', pts:'28.24', prank:'29', f:'', time:''},
      {rank:30, name:'یسنا سلمانیان', number:181, m1:'38', m2:'32', pts:'29.43', prank:'30', f:'', time:''},
      {rank:31, name:'پرنیا شمسا', number:172, m1:'38', m2:'31+', pts:'31', prank:'31', f:'', time:''},
      {rank:32, name:'دیبا پیرمحمدی', number:165, m1:'40', m2:'20', pts:'31.54', prank:'32', f:'', time:''},
      {rank:33, name:'یکتا جهانبخش', number:184, m1:'27+', m2:'30', pts:'33.94', prank:'33', f:'', time:''},
      {rank:34, name:'رهاسادات امام جمعه', number:185, m1:'32', m2:'25', pts:'34.75', prank:'34', f:'', time:''},
      {rank:35, name:'آوا مکوندی', number:175, m1:'33', m2:'24', pts:'35.47', prank:'35', f:'', time:''},
      {rank:36, name:'فاطمه قائم خواه', number:166, m1:'16', m2:'29', pts:'36.56', prank:'36', f:'', time:''},
      {rank:37, name:'حلما قهرودی', number:188, m1:'18+', m2:'24', pts:'37', prank:'37', f:'', time:''},
      {rank:38, name:'نیروانا رحیمی', number:192, m1:'36', m2:'17', pts:'37.23', prank:'38', f:'', time:''},
      {rank:39, name:'رها روانبخش حبیب ابادی', number:182, m1:'16', m2:'25', pts:'37.38', prank:'39', f:'', time:''},
      {rank:40, name:'آرینا شیخی', number:154, m1:'16', m2:'19', pts:'40.25', prank:'40', f:'', time:''},
      {rank:41, name:'حنا شعباني', number:156, m1:'15+', m2:'24', pts:'40.35', prank:'41', f:'', time:''},
      {rank:42, name:'سما سادات حسینی منش', number:167, m1:'16', m2:'17', pts:'41.24', prank:'42', f:'', time:''},
      {rank:42, name:'رویسا حبیبی', number:193, m1:'16', m2:'17', pts:'41.24', prank:'42', f:'', time:''},
      {rank:44, name:'سلنا پاپی', number:176, m1:'16', m2:'14+', pts:'42.21', prank:'44', f:'', time:''},
      {rank:45, name:'شادی ترابی', number:194, m1:'11', m2:'11', pts:'45', prank:'45', f:'', time:''},
    ],
  },
  'نونهالان B':{
    'پسران':[
      {rank:1, name:'امیرعلی سارنگ', number:140, m1:'17+', m2:'14', pts:'3', prank:'3', f:'16', time:'6.00'},
      {rank:2, name:'امیرعلی مازاده', number:137, m1:'17+', m2:'12', pts:'4.36', prank:'4', f:'16', time:'1.03'},
      {rank:3, name:'امیرعلی رهنمای سپهر', number:131, m1:'17', m2:'14', pts:'4.5', prank:'5', f:'16', time:'3.58'},
      {rank:4, name:'ماکان جلوخانی', number:143, m1:'15+', m2:'14', pts:'6', prank:'6', f:'16', time:''},
      {rank:5, name:'فراز منصور دهقان', number:142, m1:'14', m2:'14', pts:'6.54', prank:'7', f:'16', time:''},
      {rank:6, name:'مانیار جوادی', number:136, m1:'17+', m2:'14+', pts:'1.73', prank:'1', f:'15+', time:''},
      {rank:6, name:'پارسا ایوبی', number:144, m1:'17', m2:'14+', pts:'2.6', prank:'2', f:'15+', time:''},
      {rank:8, name:'کیانوش کیانلو', number:141, m1:'16', m2:'13', pts:'7.25', prank:'8', f:'12', time:''},
      {rank:9, name:'ماهور حقوردی', number:134, m1:'16+', m2:'12', pts:'7.55', prank:'9', f:'', time:''},
      {rank:10, name:'سامین محمدزاده', number:139, m1:'14', m2:'13', pts:'8.44', prank:'10', f:'', time:''},
      {rank:11, name:'بردیا ناظری', number:132, m1:'3', m2:'4+', pts:'11.49', prank:'11', f:'', time:''},
      {rank:12, name:'رادمهر متقی', number:138, m1:'6', m2:'', pts:'11.96', prank:'12', f:'', time:''},
    ],
    'دختران':[
      {rank:1, name:'ساره سادات شعبانی', number:124, m1:'47+', m2:'تاپ', pts:'4.58', prank:'3', f:'تاپ', time:'5.02'},
      {rank:2, name:'فاطمه هماتاش', number:119, m1:'48', m2:'تاپ', pts:'3.74', prank:'2', f:'48', time:'3.52'},
      {rank:3, name:'پری ناز زارع', number:127, m1:'39+', m2:'تاپ', pts:'5.92', prank:'5', f:'36', time:'3.54'},
      {rank:4, name:'دایانا دانشمند', number:108, m1:'تاپ', m2:'تاپ', pts:'2.65', prank:'1', f:'33+', time:''},
      {rank:5, name:'حوراغنوی', number:114, m1:'42', m2:'تاپ', pts:'5.29', prank:'4', f:'33+', time:''},
      {rank:6, name:'آرنیکا امانی', number:118, m1:'33+', m2:'تاپ', pts:'8.15', prank:'8', f:'33', time:''},
      {rank:6, name:'اطلسی خوانی', number:121, m1:'33+', m2:'تاپ', pts:'8.15', prank:'8', f:'33', time:''},
      {rank:8, name:'آیدا چهره گشا', number:109, m1:'34', m2:'تاپ', pts:'7', prank:'7', f:'30+', time:''},
      {rank:9, name:'رز عباس قربانی', number:106, m1:'33+', m2:'تاپ', pts:'8.15', prank:'8', f:'26', time:''},
      {rank:10, name:'آسمان مکتسب', number:105, m1:'34+', m2:'تاپ', pts:'6.48', prank:'6', f:'12+', time:''},
      {rank:11, name:'آنیا سادات بابائی', number:126, m1:'33+', m2:'تاپ', pts:'8.15', prank:'8', f:'12+', time:''},
      {rank:12, name:'نهال کرامتی', number:120, m1:'33', m2:'تاپ', pts:'9.17', prank:'12', f:'', time:''},
      {rank:13, name:'یلدا امامی نژاد', number:103, m1:'30+', m2:'تاپ', pts:'9.9', prank:'13', f:'', time:''},
      {rank:14, name:'النا عاشوری', number:111, m1:'31', m2:'38+', pts:'13.96', prank:'14', f:'', time:''},
      {rank:15, name:'ارغوان کفائی عظیمی', number:107, m1:'25+', m2:'33', pts:'16.49', prank:'15', f:'', time:''},
      {rank:16, name:'نگار شمسا', number:112, m1:'27+', m2:'16', pts:'17.32', prank:'16', f:'', time:''},
      {rank:17, name:'سیده نگار چاهوشی ساروی', number:125, m1:'20', m2:'33+', pts:'17.66', prank:'17', f:'', time:''},
      {rank:18, name:'نوژا مؤذنی', number:101, m1:'17', m2:'42', pts:'18.14', prank:'18', f:'', time:''},
      {rank:19, name:'شباهنگ دهقان', number:102, m1:'20', m2:'16', pts:'19.75', prank:'19', f:'', time:''},
      {rank:19, name:'ارغوان گلمکانی', number:113, m1:'20', m2:'16', pts:'19.75', prank:'19', f:'', time:''},
      {rank:19, name:'دلوین کرمی', number:115, m1:'20', m2:'16', pts:'19.75', prank:'19', f:'', time:''},
      {rank:19, name:'آتریسا قهرودی', number:128, m1:'20', m2:'16', pts:'19.75', prank:'19', f:'', time:''},
      {rank:23, name:'ترنم گودرزی', number:117, m1:'20', m2:'15+', pts:'21.86', prank:'23', f:'', time:''},
      {rank:24, name:'امیلی زرگر هارطونیان', number:110, m1:'17', m2:'15+', pts:'23.99', prank:'24', f:'', time:''},
      {rank:25, name:'آناشید نقی پور', number:122, m1:'14+', m2:'15+', pts:'24.99', prank:'25', f:'', time:''},
      {rank:25, name:'الین سادات طباطبایی', number:123, m1:'14+', m2:'15+', pts:'24.99', prank:'25', f:'', time:''},
      {rank:27, name:'گیسو ناظرحضرت', number:116, m1:'4+', m2:'15', pts:'27', prank:'27', f:'', time:''},
    ],
  },
  'نوجوانان C':{
    'پسران':[
      {rank:1, name:'رادمان تاجیک', number:353, m1:'تاپ', m2:'27+', pts:'2.83', prank:'3', f:'34+', time:'3.24'},
      {rank:2, name:'ایلیا داورمعین', number:344, m1:'تاپ', m2:'40', pts:'1.41', prank:'1', f:'34', time:'4.19'},
      {rank:3, name:'ایلیا صراطی', number:350, m1:'33+', m2:'28', pts:'4.06', prank:'4', f:'34', time:'4.11'},
      {rank:4, name:'كيان اميري راد', number:345, m1:'تاپ', m2:'29+', pts:'2', prank:'2', f:'33', time:''},
      {rank:5, name:'اهورا چاه تل', number:341, m1:'33', m2:'20', pts:'6.2', prank:'6', f:'22', time:''},
      {rank:6, name:'رهام عباس قربانی', number:346, m1:'32+', m2:'20', pts:'6.63', prank:'7', f:'22', time:''},
      {rank:7, name:'علی باقری زاده', number:348, m1:'33+', m2:'19', pts:'7.42', prank:'8', f:'19+', time:''},
      {rank:8, name:'پرهام پورزمانی', number:358, m1:'34', m2:'19+', pts:'5.48', prank:'5', f:'16+', time:''},
      {rank:9, name:'امیر علی عمرانی', number:352, m1:'29', m2:'19+', pts:'9.08', prank:'9', f:'', time:''},
      {rank:10, name:'آریا الکایی بهجت آباد', number:361, m1:'32', m2:'19', pts:'9.49', prank:'10', f:'', time:''},
      {rank:11, name:'طاها اسماعیلی', number:356, m1:'29', m2:'19', pts:'10.49', prank:'11', f:'', time:''},
      {rank:12, name:'سبحان خاکشور', number:360, m1:'28', m2:'18', pts:'12.75', prank:'12', f:'', time:''},
      {rank:13, name:'مهدی مرادحاصلی', number:355, m1:'25+', m2:'13', pts:'14', prank:'13', f:'', time:''},
      {rank:14, name:'محمدرسول قاسمی راد', number:357, m1:'29', m2:'12', pts:'14.07', prank:'14', f:'', time:''},
      {rank:15, name:'سام روشن‌ضمیر', number:342, m1:'23', m2:'18', pts:'14.58', prank:'15', f:'', time:''},
      {rank:16, name:'آراد ایرج زاده', number:351, m1:'25', m2:'12+', pts:'15.25', prank:'16', f:'', time:''},
      {rank:17, name:'آرمین ضرابی', number:362, m1:'23', m2:'12+', pts:'16.23', prank:'17', f:'', time:''},
      {rank:18, name:'مازیار ابراهیمی آلاشتی', number:347, m1:'23', m2:'12', pts:'17.49', prank:'18', f:'', time:''},
      {rank:19, name:'محمد شفیع شهابی', number:343, m1:'17+', m2:'12', pts:'18.97', prank:'19', f:'', time:''},
      {rank:20, name:'مهراد محمدی', number:349, m1:'19+', m2:'11+', pts:'19.49', prank:'20', f:'', time:''},
      {rank:21, name:'سید آرمین عربی', number:354, m1:'10+', m2:'5+', pts:'21.49', prank:'21', f:'', time:''},
      {rank:21, name:'اشکان مشایخ', number:359, m1:'9', m2:'8+', pts:'21.49', prank:'21', f:'', time:''},
    ],
    'دختران':[
      {rank:1, name:'شیدا صالحی', number:337, m1:'تاپ', m2:'تاپ', pts:'1.87', prank:'1', f:'38+', time:'5.17'},
      {rank:2, name:'حلما میرتقی', number:333, m1:'تاپ', m2:'35+', pts:'2.96', prank:'2', f:'35+', time:'5.17'},
      {rank:3, name:'یسنا مهرابی', number:330, m1:'34', m2:'35+', pts:'4.33', prank:'5', f:'35+', time:'5.43'},
      {rank:4, name:'مهروماه محمودی', number:322, m1:'تاپ', m2:'34+', pts:'4.18', prank:'4', f:'30', time:''},
      {rank:5, name:'الینا سامی', number:329, m1:'تاپ', m2:'24+', pts:'5.92', prank:'6', f:'30', time:''},
      {rank:6, name:'ضحی زرندی', number:312, m1:'34', m2:'29', pts:'6.71', prank:'7', f:'18+', time:''},
      {rank:7, name:'النا شیری', number:323, m1:'تاپ', m2:'35', pts:'3.74', prank:'3', f:'2', time:''},
      {rank:8, name:'روشا رادپوی', number:319, m1:'تاپ', m2:'17', pts:'7.6', prank:'8', f:'1', time:''},
      {rank:9, name:'ترمه محمدشاهی', number:316, m1:'31', m2:'25', pts:'8.49', prank:'9', f:'', time:''},
      {rank:10, name:'آیسا صالح زاده', number:338, m1:'29+', m2:'25+', pts:'8.77', prank:'10', f:'', time:''},
      {rank:11, name:'آدرینامسن آبادی', number:326, m1:'25+', m2:'24+', pts:'11.83', prank:'11', f:'', time:''},
      {rank:11, name:'نهال خسروانی', number:336, m1:'25+', m2:'24+', pts:'11.83', prank:'11', f:'', time:''},
      {rank:13, name:'فاطیما جوان ع', number:331, m1:'30', m2:'17+', pts:'12.04', prank:'13', f:'', time:''},
      {rank:14, name:'فرنوش عظیمی', number:328, m1:'29', m2:'17+', pts:'13.19', prank:'14', f:'', time:''},
      {rank:15, name:'مایا ماریتا آلکسانیانس پور', number:318, m1:'21', m2:'24', pts:'14.36', prank:'15', f:'', time:''},
      {rank:16, name:'سلنا امام جمعه', number:317, m1:'17+', m2:'24', pts:'16.58', prank:'16', f:'', time:''},
      {rank:17, name:'آروشا اکبری', number:335, m1:'25+', m2:'13', pts:'16.73', prank:'17', f:'', time:''},
      {rank:18, name:'پرنیا رازی لواسانی', number:314, m1:'21', m2:'15+', pts:'17.23', prank:'18', f:'', time:''},
      {rank:19, name:'مرسانا سلیمانی', number:321, m1:'18', m2:'17', pts:'17.94', prank:'19', f:'', time:''},
      {rank:20, name:'آگرین مختارنژاد', number:315, m1:'19+', m2:'9+', pts:'19.67', prank:'20', f:'', time:''},
      {rank:21, name:'گیتا نادری', number:334, m1:'18', m2:'9', pts:'21.18', prank:'21', f:'', time:''},
      {rank:22, name:'ستایش مرادی بنزرکی', number:325, m1:'7+', m2:'14', pts:'22.23', prank:'22', f:'', time:''},
      {rank:23, name:'الین لطفی', number:320, m1:'15+', m2:'9+', pts:'22.95', prank:'23', f:'', time:''},
      {rank:24, name:'لا ماهک یزدانی وا', number:313, m1:'17+', m2:'8+', pts:'22.98', prank:'24', f:'', time:''},
      {rank:25, name:'ارغوان عقیلی', number:324, m1:'17+', m2:'5+', pts:'23.45', prank:'25', f:'', time:''},
      {rank:26, name:'ایلین رضوانی', number:311, m1:'15+', m2:'', pts:'25.72', prank:'26', f:'', time:''},
    ],
  },
  'نوجوانان D':{
    'پسران':[
      {rank:1, name:'محمدحسن میرتقی', number:300, m1:'31', m2:'20+', pts:'2.74', prank:'2', f:'41+', time:'3.52'},
      {rank:2, name:'رایان بشیری', number:296, m1:'26+', m2:'20', pts:'7.04', prank:'7', f:'40', time:'4.57'},
      {rank:3, name:'حسین کریمی آتانی', number:285, m1:'28+', m2:'27', pts:'3.16', prank:'3', f:'39+', time:'3.02'},
      {rank:4, name:'راستین خانپور', number:282, m1:'35', m2:'28', pts:'1', prank:'1', f:'33+', time:''},
      {rank:5, name:'امیررایان صدرعاملی', number:299, m1:'31', m2:'19+', pts:'4.33', prank:'4', f:'33', time:''},
      {rank:6, name:'محمدطاها وادیپور', number:289, m1:'29', m2:'19+', pts:'5.48', prank:'5', f:'27', time:''},
      {rank:7, name:'باراد شهاب', number:287, m1:'28', m2:'20', pts:'5.81', prank:'6', f:'23+', time:''},
      {rank:8, name:'مهیار عبادی فرد', number:292, m1:'28', m2:'19+', pts:'7.5', prank:'8', f:'6', time:''},
      {rank:9, name:'کیان لکزائی فر', number:293, m1:'28', m2:'19', pts:'8.66', prank:'9', f:'', time:''},
      {rank:9, name:'امیرعباس شبانی', number:294, m1:'27', m2:'19+', pts:'8.66', prank:'9', f:'', time:''},
      {rank:11, name:'سپهر موحدیان', number:302, m1:'28', m2:'13+', pts:'10.06', prank:'11', f:'', time:''},
      {rank:12, name:'برزین رادمان', number:290, m1:'26', m2:'17+', pts:'11.49', prank:'12', f:'', time:''},
      {rank:13, name:'سپهر فرزادپور', number:288, m1:'23', m2:'14', pts:'12.96', prank:'13', f:'', time:''},
      {rank:14, name:'ماهان پیله فروشان', number:298, m1:'25+', m2:'13+', pts:'13.25', prank:'14', f:'', time:''},
      {rank:15, name:'آرین آزادی', number:301, m1:'15+', m2:'10', pts:'15.49', prank:'15', f:'', time:''},
      {rank:16, name:'محمد متین رضائی', number:281, m1:'17', m2:'8', pts:'16.66', prank:'16', f:'', time:''},
      {rank:17, name:'مبین ماهری قمی', number:291, m1:'10+', m2:'9+', pts:'16.97', prank:'17', f:'', time:''},
      {rank:18, name:'سپهرصولتی', number:284, m1:'10+', m2:'8+', pts:'17.49', prank:'18', f:'', time:''},
      {rank:19, name:'سبحان مفتاحی', number:297, m1:'10', m2:'8', pts:'19.71', prank:'19', f:'', time:''},
      {rank:20, name:'محمد مهدی رشوند', number:303, m1:'10+', m2:'1', pts:'19.9', prank:'20', f:'', time:''},
      {rank:21, name:'داوود صادقی', number:286, m1:'10', m2:'6+', pts:'20.49', prank:'21', f:'', time:''},
      {rank:22, name:'محمد معراج رجب پور', number:295, m1:'10', m2:'6', pts:'21', prank:'22', f:'', time:''},
    ],
    'دختران':[
      {rank:1, name:'نیلا اکبری', number:263, m1:'30', m2:'تاپ', pts:'2.12', prank:'1', f:'تاپ', time:'5.3'},
      {rank:2, name:'حسنا گودرزی', number:270, m1:'30', m2:'44', pts:'3', prank:'4', f:'44', time:'6'},
      {rank:3, name:'زهراسادات حسینی', number:260, m1:'31', m2:'36+', pts:'2.45', prank:'3', f:'42+', time:'5.49'},
      {rank:4, name:'السا اعتمادی فر', number:275, m1:'30', m2:'30', pts:'5.2', prank:'6', f:'41', time:''},
      {rank:5, name:'باران حفاری', number:266, m1:'30', m2:'36', pts:'4.24', prank:'5', f:'33', time:''},
      {rank:6, name:'تانیا نجفی پور', number:265, m1:'32', m2:'30+', pts:'2.24', prank:'2', f:'30', time:''},
      {rank:7, name:'نورا مرعشیان', number:252, m1:'19+', m2:'19', pts:'10.49', prank:'8', f:'16+', time:''},
      {rank:8, name:'لی لی زرگر هارطونیان', number:261, m1:'23', m2:'26', pts:'8.25', prank:'7', f:'10', time:''},
      {rank:9, name:'یاسمن طاهریان', number:273, m1:'20+', m2:'16+', pts:'11.02', prank:'9', f:'', time:''},
      {rank:10, name:'نگار دلدار', number:274, m1:'28', m2:'11+', pts:'11.38', prank:'10', f:'', time:''},
      {rank:11, name:'فاطمه درویش زیدابادی', number:251, m1:'7+', m2:'27+', pts:'11.68', prank:'11', f:'', time:''},
      {rank:12, name:'پانیذ مظفری', number:278, m1:'18', m2:'16+', pts:'12.19', prank:'12', f:'', time:''},
      {rank:13, name:'مرسانا اسلامی', number:257, m1:'7+', m2:'26', pts:'12.87', prank:'13', f:'', time:''},
      {rank:14, name:'مایسا ملایی کندلوسی', number:253, m1:'7+', m2:'20+', pts:'13.96', prank:'14', f:'', time:''},
      {rank:15, name:'آیلین نژاددادگر', number:258, m1:'17+', m2:'11+', pts:'14.9', prank:'15', f:'', time:''},
      {rank:16, name:'فریماه طاهرخانی', number:276, m1:'7+', m2:'18+', pts:'15.3', prank:'16', f:'', time:''},
      {rank:17, name:'صبا ابراهیم خانی', number:256, m1:'17', m2:'11+', pts:'15.51', prank:'17', f:'', time:''},
      {rank:18, name:'ستاره سپهری فر', number:277, m1:'8', m2:'11+', pts:'16.09', prank:'18', f:'', time:''},
      {rank:19, name:'خورشید امتثالی', number:272, m1:'7+', m2:'14', pts:'17.1', prank:'19', f:'', time:''},
      {rank:20, name:'نیلوفر قمری', number:255, m1:'7+', m2:'11+', pts:'18.99', prank:'20', f:'', time:''},
      {rank:20, name:'نهال مقدم', number:269, m1:'7+', m2:'11+', pts:'18.99', prank:'20', f:'', time:''},
      {rank:22, name:'آنیتا رزاقی', number:254, m1:'7+', m2:'11', pts:'21.18', prank:'22', f:'', time:''},
      {rank:22, name:'روناک پیروز', number:271, m1:'7+', m2:'11', pts:'21.18', prank:'22', f:'', time:''},
      {rank:24, name:'آیسل نژاددادگر', number:259, m1:'7+', m2:'8+', pts:'22.52', prank:'24', f:'', time:''},
      {rank:25, name:'آرنیکا فتاح', number:267, m1:'7', m2:'11', pts:'24.69', prank:'25', f:'', time:''},
      {rank:26, name:'هانا ممدوحی نیا', number:268, m1:'7', m2:'9+', pts:'25.74', prank:'26', f:'', time:''},
      {rank:27, name:'پناه پوررفیع', number:262, m1:'7', m2:'8', pts:'26.75', prank:'27', f:'', time:''},
      {rank:28, name:'نیکا سادات سجادی تفرشی', number:264, m1:'7', m2:'6', pts:'27.24', prank:'28', f:'', time:''},
    ],
  },
};

const toFa = n => String(n).replace(/\d/g, d=>'۰۱۲۳۴۵۶۷۸۹'[d]);

// hold / score display: 'تاپ' highlighted, '' => dash
function cell(v){
  if(v===null || v===undefined || v==='') return '<span class="dnf">—</span>';
  return v==='تاپ' ? '<span class="top">تاپ</span>' : toFa(v);
}
function listFor(cat, gender){ return (OVERALL[cat] && OVERALL[cat][gender]) || []; }

/* ============================================================
   Wizard: رده سنی  →  overall standings table + gender toggle
   ============================================================ */
const state = { cat:null, gender:'پسران' };
let step = 0;
const view = document.getElementById('view');
const crumbsEl = document.getElementById('crumbs');
const chevron = '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>';

function choiceCard(label, onClick){
  const b=document.createElement('button');
  b.className='choice';
  b.innerHTML='<span>'+label+'</span><span class="ar">'+chevron+'</span>';
  b.addEventListener('click', onClick);
  return b;
}

function render(){
  renderCrumbs();
  if(step===0){
    const box=document.createElement('div'); box.className='step';
    box.innerHTML='<div class="step-q">رده‌ی سنی را انتخاب کن</div>';
    const grid=document.createElement('div'); grid.className='choices';
    CAT_ORDER.forEach(c=> grid.appendChild(choiceCard(c, ()=>{ state.cat=c; step=1; render(); })) );
    box.appendChild(grid);
    view.innerHTML=''; view.appendChild(box);
  } else {
    renderTable();
  }
}

function renderCrumbs(){
  crumbsEl.innerHTML='';
  if(step>=1 && state.cat){
    const c=document.createElement('button');
    c.className='crumb';
    c.innerHTML = state.cat + ' <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
    c.addEventListener('click',()=>{ step=0; state.cat=null; render(); });
    crumbsEl.appendChild(c);
  }
}

function renderTable(){
  const cat = state.cat;
  const rows = listFor(cat, state.gender);
  const box=document.createElement('div'); box.className='result';

  const head=document.createElement('div'); head.className='result-head';
  head.innerHTML =
    '<div class="result-cat">'+
      '<span class="tag tag-cat">'+cat+'</span>'+
      '<span class="tag tag-g">رده‌بندی کلی</span>'+
    '</div>'+
    '<div class="seg" role="tablist">'+
      '<button data-g="پسران" class="'+(state.gender==='پسران'?'on':'')+'">پسران</button>'+
      '<button data-g="دختران" class="'+(state.gender==='دختران'?'on':'')+'">دختران</button>'+
    '</div>';
  head.querySelectorAll('.seg button[data-g]').forEach(b=>b.addEventListener('click',()=>{state.gender=b.dataset.g;render();}));
  box.appendChild(head);

  const count=document.createElement('div'); count.className='result-count';
  count.innerHTML='<span class="dot"></span> '+toFa(rows.length)+' شرکت‌کننده · '+state.gender;
  box.appendChild(count);

  let html='<table class="rs-table"><thead>'+
    '<tr>'+
      '<th class="c-rank" rowspan="2">رتبه</th>'+
      '<th class="c-name" rowspan="2">نام و نام خانوادگی</th>'+
      '<th class="c-num" rowspan="2">شماره</th>'+
      '<th class="grp c-grpstart" colspan="4">مرحله مقدماتی</th>'+
      '<th class="grp c-grpstart" colspan="2">مرحله نهایی</th>'+
    '</tr>'+
    '<tr>'+
      '<th class="c-r1 c-grpstart">مسیر ۱</th>'+
      '<th class="c-r2">مسیر ۲</th>'+
      '<th class="c-pts">امتیاز کل</th>'+
      '<th class="c-prank">رتبه</th>'+
      '<th class="c-f c-grpstart">امتیاز</th>'+
      '<th class="c-time">زمان</th>'+
    '</tr></thead><tbody>';
  if(!rows.length){
    html+='<tr><td class="empty" colspan="9">نتیجه‌ای برای این گروه ثبت نشده است.</td></tr>';
  } else {
    rows.forEach(r=>{
      const cls = r.rank<=3 ? ' class="r'+r.rank+'"' : '';
      html+='<tr'+cls+'>'+
        '<td class="c-rank"><span class="rb">'+toFa(r.rank)+'</span></td>'+
        '<td class="c-name">'+r.name+'</td>'+
        '<td class="c-num">'+toFa(r.number)+'</td>'+
        '<td class="c-r1 c-grpstart">'+cell(r.m1)+'</td>'+
        '<td class="c-r2">'+cell(r.m2)+'</td>'+
        '<td class="c-pts">'+(r.pts?toFa(r.pts):'<span class="dnf">—</span>')+'</td>'+
        '<td class="c-prank">'+(r.prank?toFa(r.prank):'<span class="dnf">—</span>')+'</td>'+
        '<td class="c-f c-grpstart">'+cell(r.f)+'</td>'+
        '<td class="c-time">'+(r.time?toFa(r.time):'<span class="dnf">—</span>')+'</td>'+
      '</tr>';
    });
  }
  html+='</tbody></table>';
  const tbl=document.createElement('div'); tbl.className='rs-scroll'; tbl.innerHTML=html;
  box.appendChild(tbl);

  const note=document.createElement('div'); note.className='rs-note';
  note.textContent='رده‌بندی کلی = ترکیب نتیجه‌ی مرحله‌ی مقدماتی و فینال. ستون‌های مسیر ۱ و ۲ بالاترین گیره‌ی لمس‌شده در مقدماتی‌اند و «امتیاز کل» رتبه‌ی ترکیبی دو مسیر است. ستون‌های فینال فقط برای ۸ فینالیست پر می‌شود؛ زمان تنها برای نفرات برتر که مسیر را تاپ کرده‌اند ثبت می‌شود.';
  box.appendChild(note);

  const foot=document.createElement('div'); foot.className='result-foot';
  foot.innerHTML='<button class="btn-back"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-7 3.3"/><path d="M3 4v4h4"/></svg> انتخاب رده‌ی دیگر</button>';
  foot.querySelector('button').addEventListener('click',()=>{ step=0; state.cat=null; render(); });
  box.appendChild(foot);

  view.innerHTML=''; view.appendChild(box);
}

render();
