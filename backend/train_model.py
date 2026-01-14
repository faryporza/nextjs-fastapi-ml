import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

# ตั้งค่า Path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, 'data.csv')
MODEL_DIR = os.path.join(BASE_DIR, 'models')
MODEL_PATH = os.path.join(MODEL_DIR, 'iris_model.pkl')

# สร้างโฟลเดอร์ models ถ้ายังไม่มี
if not os.path.exists(MODEL_DIR):
    os.makedirs(MODEL_DIR)

# 1. โหลดข้อมูล (สำคัญ: ข้อมูลไม่มี Header ต้องตั้งชื่อ Column เอง)
column_names = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'species']
df = pd.read_csv(CSV_PATH, header=None, names=column_names)

print("Data Sample:")
print(df.head())

# 2. แยก Features (X) และ Target (y)
X = df[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
y = df['species']

# 3. แบ่งข้อมูลเพื่อ Test 20%
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. เทรนโมเดล (ใช้ Random Forest เพราะแม่นยำกับ Iris)
print("\nTraining Model...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5. วัดผล
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# 6. Save Model
joblib.dump(model, MODEL_PATH)
print(f"Model saved at: {MODEL_PATH}")