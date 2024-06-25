# Google Apps Script Development 💯

# แบบบันทึกเวลาบริการและอุณหภูมิการส่งอาหารผู้ป่วยประจำวัน

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

ระบบบันทึกเวลาบริการและอุณหภูมิการส่งอาหารผู้ป่วยประจำวัน google sheet และ app script โดยมีฟังก์ชันการใช้งานตามนี้ Version 1.0

- สามารถแสดงหน้าต่างการใช้งานเมื่อเปิดเข้าไฟล์ได้
- ค้นหาและเลือกดูข้อมูลบน LIFF (LINE FRONTEND FRAMEWORK)
- บันทึกข้อมูลเวลาบริการและอุณหภูมิการส่งอาหารผู้ป่วยประจำวัน

# How to use (วิธีการใช้งาน)

**1.** ทำการสร้างไฟล์งานบน google sheet และทำการนำเข้าไฟล์ที่ใช้สำหรับโปรเจ็คนี้
![Main Panel UI](https://github.com/ggafiled/googlesheet_appscript_project_list/blob/master/img/googlesheet_appscript_project_list_01.PNG)
ทั้งนี้ในไฟล์งานต้องมีชีทที่ชื่อว่า Progress ที่จะใช้สำหรับการค้นหาข้อมูลเพื่อนำมาแสดงผล]

**2.** ทำการสร้าง App Script Project ตามภาพ
![Expand](https://github.com/ggafiled/googlesheet_appscript_project_list/blob/master/img/expand-03.jpg)
จากนั้นให้ทำการตั้งค่า App Script Project ดังนี้
![Expand](https://github.com/ggafiled/googlesheet_appscript_project_list/blob/master/img/expand-04.jpg)
และทำการคัดลอกลิงค์ URL เก็บไว้เพื่อรอใช้งานในขั้นตอนถัดไป

**3.** ทำการเพิ่ม Property เพื่อเก็บค่าที่จะใช้ภายในโปรเจ็ค ดังนี้

| Property                 | ความหมาย                                     | ค่าที่เก็บ                                                                                                                                       |
| ------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| GOOGLE_SHEET_ID          | ไอดีของชีท                                   | นำมาจากลิงค์ที่หน้าโปรเจ็ค google sheet <img src="https://github.com/ggafiled/googlesheet_appscript_project_list/blob/master/img/expand-08.jpg"> |

**4.** ทำการโหลดไฟล์โค้ดนี้ลงเครื่อง ด้วยคำสั่ง

```node
git clone https://github.com/ggafiled/clasp_vimut_form.git

// จากนั้นเข้าไปยังโฟลเดอร์โปรเจ็ค
cd clasp_vimut_form

// และติดตั้ง Library ที่จำเป็น
npm i -g @google/clasp
npm i

// เสร็จขั้นตอนข้างบนแล้วให้ทำการ Login เข้า Account Google ของเราเพื่อให้สิทธิ์ในการอัพโค้ดขึ้นคลาว์
clasp login

// หลังจากนั้นเปิดการอนุญาตอัพโค้ดที่ลิงค์นี้
https://script.google.com/home/usersettings

```

**5.** ที่ไฟล์ `html .clasp.json ` กรอกรหัสสคริปต์
หาได้จาก ![Expand](https://github.com/ggafiled/googlesheet_appscript_project_list/blob/master/img/expand-09.jpg)

```json5
{
  scriptId: 'นำรหัสสคริปต์ของโปรเจ็คเรามาใส่ตรงนี้',
  rootDir: './dist',
}
```

**6.** หลังจากตั้งค่าสิ่งที่ต้องการทั้งหมดแล้วให้ทำการอัพโค้ดขึ้น app script cloud ด้วยคำสั่ง

```node
npm run deploy:prod

```

# Overall 🍚🍣 (ตัวอย่างภาพรวม)

### ตัวอย่างข้อมูลที่จะทำการค้นหา

![Main Panel UI](https://github.com/ggafiled/googlesheet_appscript_project_list/blob/master/img/googlesheet_appscript_project_list_02.PNG)

# Copyright 🏛

Copyright (c)Ggafiled (Nattapol Krobklang):See [LICENSE](https://github.com/ggafiled/clasp_vimut_form/blob/master/LICENSE).
