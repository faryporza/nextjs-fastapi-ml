### Python

# วิธีรันเพื่อทดสอบ (ในเครื่อง)

1. **เทรนโมเดลก่อน:**
เปิด Terminal เข้าไปที่ root folder (`nextjs-fastapi-ml`) แล้วรัน:
```bash
# สร้าง model file (.pkl)
python backend/train_model.py

```


*ถ้าสำเร็จ จะมีไฟล์ `backend/models/iris_model.pkl` โผล่ขึ้นมา*
2. **รัน Server:**
```bash
# รัน FastAPI
uvicorn backend.main:app --reload

```


*ถ้าสำเร็จ จะขึ้นว่า running on `http://127.0.0.1:8000*`
3. **ทดสอบ:**
เปิด Browser ไปที่ `http://127.0.0.1:8000/docs` แล้วลองเล่นเมนู `/predict` ดูครับ

**ขั้นตอนต่อไป:** อยากให้ผมพาทำฝั่ง **Next.js (Frontend)** เพื่อสร้างฟอร์มกรอกข้อมูล 4 ช่อง แล้วยิงมาที่ API นี้เลยไหมครับ?