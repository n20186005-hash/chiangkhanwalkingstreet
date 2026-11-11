import type { LocalText } from './seo-topics';

const tr = (en: string, th: string, zh: string): LocalText => ({ en, th, zh });
type Section = { heading: LocalText; text: LocalText };
type Faq = { question: LocalText; answer: LocalText };
export type NearbyGuide = {
  slug: string; name: LocalText; subtitle: LocalText; category: LocalText;
  location: string; mapsQuery: string; images: string[];
  introduction: LocalText; history: LocalText; management: LocalText;
  sections: Section[]; faq: Faq[]; source: string;
};
const section = (heading: LocalText, text: LocalText): Section => ({ heading, text });
const faq = (question: LocalText, answer: LocalText): Faq => ({ question, answer });

export const nearbyGuides: NearbyGuide[] = [
  {
    slug:'kaeng-khut-khu', name:tr('Kaeng Khut Khu Rapids','แก่งคุดคู้','Kaeng Khut Khu 急流'),
    subtitle:tr('Mekong river bend, rocks and seasonal water','โค้งแม่น้ำโขง โขดหิน และสายน้ำตามฤดู','湄公河大弯、岩滩与季节水文'), category:tr('Natural river attraction','แหล่งท่องเที่ยวธรรมชาติ','自然河景'),
    location:'Chiang Khan District, Loei 42110, Thailand', mapsQuery:'Kaeng Khut Khu Chiang Khan Loei Thailand',
    images:['/nearby/kaeng-khut-khu-1.jpg','/nearby/kaeng-khut-khu-2.jpg'],
    introduction:tr('A memorable bend in the Mekong east of Chiang Khan town. Water levels reveal or hide the rocky shelves, so the view is different across the year.','โค้งแม่น้ำโขงทางตะวันออกของตัวเมืองเชียงคาน ระดับน้ำที่ขึ้นลงทำให้เห็นโขดหินต่างกันในแต่ละฤดู','清刊镇东侧著名的湄公河弯道，随着水位涨落，岩滩时隐时现。'),
    history:tr('The rapids have long been part of the river landscape and local river journeys. Their exposed rock formations are associated with regional folklore; distinguish those stories from documented geology.','แก่งแห่งนี้เป็นส่วนหนึ่งของภูมิทัศน์และการเดินทางทางน้ำมาแต่เดิม เรื่องเล่าเกี่ยวกับโขดหินเป็นคติชนท้องถิ่น ไม่ใช่หลักฐานทางธรณีวิทยา','急流长期是当地河运与生活景观的一部分。岩石也关联地方传说，但民间故事与地质解释应分别理解。'),
    management:tr('The viewing area forms part of the local Chiang Khan tourism landscape. Follow the current on-site notices for access and facilities.','พื้นที่ชมวิวเป็นส่วนหนึ่งของแหล่งท่องเที่ยวในเชียงคาน ให้ยึดประกาศหน้างานเรื่องการเข้าใช้และสิ่งอำนวยความสะดวก','观景区属于清刊地方旅游环境，出入及设施安排应依现场公告。'),
    sections:[
      section(tr('Geology and what to observe','ธรณีสัณฐานและจุดสังเกต','地貌与观察重点'),tr('Watch where the current speeds up around the exposed rocks and compare the broad river channel with the narrower turbulent portions. Do not walk onto wet stones.','สังเกตกระแสน้ำที่ไหลแรงรอบโขดหิน เปรียบเทียบช่วงลำน้ำกว้างกับจุดน้ำวน และไม่ลงไปเดินบนหินเปียก','观察水流绕过岩石时的加速与旋涡，对比宽阔河道和湍急河段，勿踏上湿滑岩石。')),
      section(tr('Recommended visit','เวลาเที่ยวที่แนะนำ','游览建议'),tr('Allow roughly 45–75 minutes for the public viewpoint, river panorama and a relaxed break. In the rainy season, expect a higher river and fewer visible rocks.','เผื่อเวลาประมาณ 45–75 นาทีสำหรับจุดชมวิวและพักผ่อน ช่วงฝนระดับน้ำอาจสูงจนเห็นหินน้อย','建议预留约 45–75 分钟看观景台、河湾和休息；雨季水高时岩石可能被淹没。')),
      section(tr('Walking route','เส้นทางเดิน','步行路线'),tr('Begin at the signed visitor area, follow the public riverside path, pause at an unobstructed bend viewpoint, and return by the same established path.','เริ่มจากทางเข้าพื้นที่ท่องเที่ยว เดินตามทางสาธารณะริมแม่น้ำ แวะจุดชมโค้งน้ำ แล้วกลับทางเดิม','从游客区域入口沿公共河边步道走到无遮挡的河湾观景处，再沿原路返回。')),
      section(tr('Transport from walking street','การเดินทางจากถนนคนเดิน','从步行街前往'),tr('This is not in the central pedestrian zone. Arrange a local car or suitable transfer, confirm a return ride and check the specific pin before leaving.','จุดนี้อยู่นอกเขตถนนคนเดิน ควรจัดรถรับส่งและเที่ยวกลับ พร้อมตรวจหมุดแผนที่ให้ตรงสถานที่','这里不在夜市步行范围内，可安排当地车辆往返，并核对地图位置和回程交通。')),
      section(tr('Photography','มุมถ่ายภาพ','摄影机位'),tr('Try a wide view along the river bend, then a closer composition of rocky shelves when water is low. Early or late light emphasizes the contours.','ถ่ายมุมกว้างตามโค้งน้ำ และมุมโขดหินช่วงน้ำลด แสงเช้าหรือเย็นช่วยให้เห็นมิติชัด','先拍河湾全景，水低时再拍岩滩层次；早晚侧光能突出地形。'))
    ], faq:[
      faq(tr('Is Kaeng Khut Khu the night market?','แก่งคุดคู้คือตลาดถนนคนเดินหรือไม่','急流就是清刊夜市吗？'),tr('No. It is a separate Mekong river viewpoint outside the central old town.','ไม่ใช่ เป็นจุดชมแม่น้ำโขงแยกจากเมืองเก่า','不是，它是老城外的独立湄公河景点。')),
      faq(tr('Can I walk on the rocks?','เดินบนโขดหินได้ไหม','可以走上岩石吗？'),tr('Stay in designated visitor areas; wet or submerged rocks and strong currents are dangerous.','ควรอยู่ในเขตที่กำหนด หินเปียกและน้ำไหลแรงอันตราย','应待在指定游览区，湿滑岩石及急流存在危险。'))
    ], source:'https://www.lovethailand.org/travel/en/42-Loei/2996-Kaeng-Khut-Khu.html'
  },
  {
    slug:'phu-thok', name:tr('Phu Thok Chiang Khan Viewpoint','ภูทอก เชียงคาน','清刊 Phu Thok 观景山'),
    subtitle:tr('Morning mist and views over the Mekong valley','ชมทะเลหมอกและหุบเขาโขงยามเช้า','清晨云海与湄公河谷景观'), category:tr('Hilltop viewpoint','จุดชมวิวภูเขา','山顶观景点'),
    location:'Chiang Khan District, Loei 42110, Thailand', mapsQuery:'Phu Thok Chiang Khan Loei viewpoint Thailand',
    images:['/nearby/phu-thok-1.jpg','/nearby/phu-thok-2.jpg'],
    introduction:tr('A hill near Chiang Khan famous for morning views over the town and Mekong valley. Fog varies greatly with weather.','ภูเขาใกล้เชียงคานขึ้นชื่อเรื่องวิวเมืองและหุบเขาโขงตอนเช้า ทะเลหมอกขึ้นอยู่กับอากาศ','清刊附近可眺望城镇与湄公河谷的山丘，晨雾景象受天气影响很大。'),
    history:tr('Phu Thok has become a sunrise excursion paired with the traditional market town. Its appeal comes from the valley topography and seasonal mist rather than monumental architecture.','ภูทอกกลายเป็นจุดชมพระอาทิตย์ขึ้นที่นิยมควบคู่กับเมืองเก่า จุดเด่นคือภูมิประเทศและหมอกตามฤดู ไม่ใช่อาคารอนุสรณ์','Phu Thok 已成为搭配清刊古镇的日出行程，其吸引力主要来自山谷地形和季节性晨雾。'),
    management:tr('Access and local shuttle arrangements are organised on site and can change. Verify the latest rules before an early departure.','การขึ้นจุดชมวิวและรถรับส่งจัดการในพื้นที่และอาจเปลี่ยนได้ ควรตรวจข้อมูลล่าสุดก่อนออกเช้ามืด','登山与接驳安排由现场管理且可能调整，清晨出发前应确认最新规则。'),
    sections:[
      section(tr('Landscape and observation','ภูมิทัศน์และจุดสังเกต','地貌与观察重点'),tr('Compare the layers of valley ridges, the course of the Mekong and low cloud below the viewpoint. On clear days, distant contours may be more visible than fog.','มองแนวสันเขาซ้อนกัน ลำน้ำโขง และเมฆต่ำใต้จุดชมวิว วันฟ้าใสอาจเห็นแนวเขาชัดกว่าหมอก','观察层叠山脊、湄公河走向以及山下低云；晴朗时可能以远山轮廓为主，而非云海。')),
      section(tr('Best time and duration','ช่วงเวลาที่เหมาะสม','时间与停留'),tr('Plan for an early-morning visit and allow time for the transfer and waiting for light. Mist is never guaranteed; check local weather and visibility.','วางแผนมาเช้า เผื่อเวลารถรับส่งและรอแสง ทะเลหมอกไม่แน่นอน ควรดูพยากรณ์และทัศนวิสัย','适合清晨参观，预留接驳和等光时间；云海无法保证，需查看天气及能见度。')),
      section(tr('Walking route and access','ทางเดินและการขึ้นภู','步行与上山'),tr('Follow the designated access system and viewpoints. Do not bypass barriers or move to steep edges for a photograph.','ใช้เส้นทางขึ้นภูและจุดชมวิวที่กำหนด ไม่ข้ามรั้วหรือเข้าใกล้ขอบชันเพื่อถ่ายภาพ','使用指定上山通道与观景区，勿越过护栏接近陡坡。')),
      section(tr('Transport','การเดินทาง','交通'),tr('It is outside the walking street. Arrange an early transfer and confirm where the local shuttle starts, if operating. Do not confuse this Phu Thok with the mountain of the same name in Bueng Kan.','อยู่นอกถนนคนเดิน จัดรถแต่เช้าและตรวจจุดขึ้นรถรับส่ง หากมีบริการ อย่าสับสนกับภูทอกจังหวัดบึงกาฬ','不在步行街内，需安排早班交通、确认当地接驳点；注意勿与汶干府同名 Phu Thok 混淆。')),
      section(tr('Photography','มุมถ่ายภาพ','摄影'),tr('Use a wide lens for the ridges and a longer focal length for isolated trees or mist pockets. Keep the horizon level and protect gear from condensation.','ใช้เลนส์มุมกว้างเก็บแนวเขา หรือเลนส์ยาวจับหมอกเป็นชั้น ระวังละอองน้ำบนอุปกรณ์','广角适合河谷全景，长焦适合雾层与山脊；注意清晨湿气对器材的影响。'))
    ], faq:[
      faq(tr('Will I definitely see a sea of mist?','จะเห็นทะเลหมอกแน่นอนไหม','一定能看到云海吗？'),tr('No. It depends on humidity, wind, cloud and the season.','ไม่แน่นอน ขึ้นกับความชื้น ลม เมฆ และฤดูกาล','不能保证，取决于湿度、风、云量和季节。')),
      faq(tr('Can I walk there from the market?','เดินจากตลาดไปได้ไหม','可以从夜市步行去吗？'),tr('Plan a vehicle transfer; it is a separate hill excursion.','ควรใช้รถไป เพราะเป็นทริปขึ้นภูแยกจากตลาด','建议搭车，这是独立的山地行程。'))
    ], source:'https://www.thailandtourismdirectory.go.th/en/attraction/4451'
  },
  {
    slug:'wat-si-khun-mueang', name:tr('Wat Si Khun Mueang','วัดศรีคุณเมือง','Wat Si Khun Mueang 寺'),
    subtitle:tr('Buddhist architecture in Chiang Khan old town','สถาปัตยกรรมพุทธในเมืองเก่าเชียงคาน','清刊老城的佛教建筑与工艺'), category:tr('Historic Buddhist temple','วัดเก่าแก่','历史佛寺'),
    location:'Chiang Khan, Loei 42110, Thailand', mapsQuery:'Wat Si Khun Mueang Chiang Khan Loei Thailand',
    images:['/nearby/wat-si-khun-mueang-1.jpg'],
    introduction:tr('An old-town temple associated with Chiang Khan’s Buddhist community and the cultural exchange of the Mekong region.','วัดในเมืองเก่าที่เกี่ยวข้องกับวิถีพุทธและศิลปวัฒนธรรมสองฝั่งโขง','老城寺庙体现清刊佛教社区及湄公河两岸文化交流。'),
    history:tr('The temple belongs to the religious heritage of Chiang Khan and is noted for artistic influences from the Lan Xang and northern Thai traditions. Avoid assigning a precise building date to every structure without an inscription.','วัดเป็นมรดกศาสนาของเชียงคาน มีศิลปะที่ได้รับอิทธิพลล้านช้างและศิลปะเหนือ ควรแยกอายุอาคารแต่ละหลังจากหลักฐานจริง','寺院属于清刊宗教遗产，艺术风格受到澜沧与泰北传统影响；不同建筑年代应以碑铭等证据为准。'),
    management:tr('This is an active Buddhist temple. Visitors should follow temple rules and respect worship and community activities.','เป็นวัดที่ใช้ประกอบศาสนกิจจริง ผู้มาเยือนควรปฏิบัติตามระเบียบวัดและเคารพกิจกรรมชุมชน','这里仍是实际运作的佛教寺院，参观应遵循寺规并尊重宗教活动。'),
    sections:[
      section(tr('Architecture to notice','จุดสังเกตด้านสถาปัตยกรรม','建筑观察重点'),tr('Look for roof profiles, decorative gables and painted or carved religious motifs. Compare these details with nearby domestic timber houses.','สังเกตทรงหลังคา หน้าบัน และลวดลายเขียนหรือแกะสลักทางศาสนา เปรียบเทียบกับบ้านไม้ใกล้เคียง','留意屋顶轮廓、山墙装饰与宗教绘画雕刻，并和附近民居木构对照。')),
      section(tr('Suggested visit','วิธีเที่ยวที่แนะนำ','游览建议'),tr('Allow a quiet 20–40 minutes outside worship times. Dress modestly, remove shoes where required and avoid entering closed rooms.','ใช้เวลาประมาณ 20–40 นาทีอย่างสงบ แต่งกายสุภาพ ถอดรองเท้าตามป้าย และไม่เข้าพื้นที่ปิด','可留 20–40 分钟安静参观，着装得体，按指示脱鞋，勿进入关闭区域。')),
      section(tr('Walking route','เส้นทางเดิน','步行路线'),tr('Begin at the temple entrance, observe the courtyard and main hall from permitted areas, then continue through the old town toward Chai Khong Road.','เริ่มที่ทางเข้าวัด ชมลานและอาคารหลักจากพื้นที่ที่อนุญาต แล้วเดินต่อย่านเก่าไปถนนชายโขง','从寺门进入，观察庭院及主殿外观，之后接老城道路步行至 Chai Khong 路。')),
      section(tr('Transport','การเดินทาง','交通'),tr('Within the historic town area, it can be combined with a walking-street visit. Check its own map destination rather than using the night-market pin.','อยู่ในย่านเมืองเก่า สามารถเที่ยวคู่ถนนคนเดินได้ ควรใช้หมุดวัดโดยตรง ไม่ใช้หมุดตลาด','位于老城区，可与步行街串联；导航必须选择寺院本身而非夜市坐标。')),
      section(tr('Photography','การถ่ายภาพ','摄影'),tr('Photograph the exterior roof layers from the courtyard and small decorative details where permitted. Ask before photographing monks or worshippers.','ถ่ายแนวหลังคาจากลานและรายละเอียดตกแต่งในเขตที่อนุญาต ขออนุญาตก่อนถ่ายพระหรือผู้มาทำบุญ','可从庭院拍层叠屋顶和雕饰细节，拍僧侣或信众前先征得同意。'))
    ], faq:[
      faq(tr('Is this a functioning temple?','วัดยังมีศาสนกิจอยู่ไหม','仍是宗教场所吗？'),tr('Yes. Give priority to worshippers and follow posted guidance.','ใช่ ควรให้ความสำคัญกับผู้มาทำบุญและทำตามป้าย','是，应尊重宗教活动并遵守现场指示。')),
      faq(tr('Can I combine it with the walking street?','เที่ยวพร้อมถนนคนเดินได้ไหม','能和步行街一起游览吗？'),tr('Yes, it makes a natural daylight cultural stop before the evening market.','ได้ เหมาะแวะตอนกลางวันก่อนเที่ยวตลาดเย็น','可以，适合作为夜市之前的白天文化参访点。'))
    ], source:'https://www.lovethailand.org/travel/en/42-Loei/2976-Wat-Si-Khun-Mueang.html'
  },
  {
    slug:'wat-tha-khok', name:tr('Wat Tha Khok','วัดท่าคก','Wat Tha Khok 寺'),
    subtitle:tr('Historic riverside temple and old Chiang Khan stories','วัดเก่าริมโขงกับประวัติเมืองเชียงคาน','湄公河边的古寺与清刊历史'), category:tr('Historic Buddhist temple','วัดเก่าแก่','历史佛寺'),
    location:'Chiang Khan, Loei 42110, Thailand', mapsQuery:'Wat Tha Khok Chiang Khan Loei Thailand',
    images:['/nearby/wat-tha-khok-1.jpg','/nearby/wat-tha-khok-2.jpg'],
    introduction:tr('A historic Buddhist temple along the Chiang Khan riverfront, connected to the town’s nineteenth-century local history.','วัดเก่าริมแม่น้ำโขงที่เชื่อมโยงกับประวัติศาสตร์เชียงคานในคริสต์ศตวรรษที่ 19','沿湄公河而建的历史佛寺，与十九世纪清刊地方史有关。'),
    history:tr('The Thailand Tourism Directory records that Wat Tha Khok was built in 1852 under a Chiang Khan governor, according to a stone inscription. The place name refers to a whirlpool or river bend known locally as “Khok”.','ข้อมูลจากระบบท่องเที่ยวไทยอ้างจารึกระบุว่าวัดสร้างปี พ.ศ. 2395 ในสมัยเจ้าเมืองเชียงคาน ชื่อ “คก” เชื่อมโยงกับลักษณะน้ำวนริมแม่น้ำ','泰国旅游目录据石刻记载，寺院由清刊地方官于 1852 年兴建；“Khok” 与当地河流旋涡或河弯地貌相关。'),
    management:tr('This remains a Buddhist religious site. Observe posted temple rules and avoid disturbing ceremonies.','ยังเป็นศาสนสถานพุทธ ควรเคารพกฎวัดและไม่รบกวนพิธีกรรม','寺院仍用于佛教活动，应遵循寺规并避免干扰仪式。'),
    sections:[
      section(tr('Architecture and history','สถาปัตยกรรมและประวัติ','建筑与历史观察'),tr('Study the prayer hall, roof detailing and courtyard as a series of layers rather than a single frozen date. Read any interpretation signs before attributing a specific period.','ดูอุโบสถ รายละเอียดหลังคา และลานวัดเป็นชั้นประวัติศาสตร์ต่างยุค อ่านป้ายก่อนระบุอายุอาคาร','观察佛殿、屋顶细部及院落的不同修建层次；不要把所有现存建筑都简单归为 1852 年。')),
      section(tr('Visit length','ระยะเวลาเที่ยว','停留建议'),tr('Plan a respectful 20–40 minute stop, longer if you enjoy religious architecture. Avoid the busiest worship periods for photography.','ใช้เวลาประมาณ 20–40 นาที หรือมากกว่าหากสนใจสถาปัตยกรรม หลีกเลี่ยงถ่ายภาพรบกวนช่วงประกอบพิธี','可停留 20–40 分钟，建筑爱好者可更久；宗教仪式繁忙时减少摄影。')),
      section(tr('Walking route','เส้นทางเดิน','步行路线'),tr('Begin at the public approach, explore the permitted courtyard and main-hall exterior, then join the Mekong riverside path and continue to the old town.','เริ่มจากทางเข้าสาธารณะ ชมลานและด้านนอกอาคารหลัก แล้วต่อทางเดินริมโขงเข้าสู่เมืองเก่า','从公共入口观察院落与主殿外观，再接湄公河滨步道走回老城。')),
      section(tr('Transport','การเดินทาง','交通'),tr('Use the exact temple name in navigation. It can be included in a Chiang Khan old-town and riverfront walk, depending on your start point.','ใช้ชื่อวัดท่าคกในแผนที่โดยตรง สามารถเชื่อมกับเมืองเก่าและทางเดินริมแม่น้ำตามจุดเริ่มต้น','地图搜索 Wat Tha Khok 寺院本身，可与老城及河滨散步连成一路。')),
      section(tr('Photography','มุมถ่ายภาพ','摄影机位'),tr('Frame the temple roof against the sky from public areas, and focus on permitted ornament details. Be discreet when people are praying.','ถ่ายแนวหลังคากับท้องฟ้าจากพื้นที่สาธารณะ และรายละเอียดประดับในจุดที่อนุญาต ไม่รบกวนผู้สวดมนต์','可从公共区域拍屋顶天际线和允许拍摄的装饰细部，礼佛时保持低调。'))
    ], faq:[
      faq(tr('When was the temple built?','วัดสร้างเมื่อไร','寺院建于何时？'),tr('A tourism-directory account cites an 1852 founding recorded in an inscription. Individual buildings may have been altered later.','ข้อมูลการท่องเที่ยวอ้างจารึกระบุปี พ.ศ. 2395 แต่อาคารบางหลังอาจซ่อมแซมภายหลัง','旅游目录依据碑刻记载为 1852 年，现存建筑可能经过后期修缮。')),
      faq(tr('Is admission the same as the night market?','เข้าชมเหมือนตลาดถนนคนเดินไหม','需要用夜市入口吗？'),tr('No. Use the temple entrance and follow its own visiting rules.','ไม่ใช่ ให้ใช้ทางเข้าวัดและปฏิบัติตามกฎวัด','不是，应走寺院入口并遵守寺院规定。'))
    ], source:'https://www.thailandtourismdirectory.go.th/en/attraction/101752'
  }
];
