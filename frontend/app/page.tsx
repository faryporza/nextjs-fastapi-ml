// frontend/src/app/page.tsx
'use client';

import { useState } from 'react';

export default function Home() {
  // 1. สร้าง State สำหรับเก็บค่า Input ทั้ง 4 ตัว
  const [formData, setFormData] = useState({
    sepal_length: '5.1',
    sepal_width: '3.5',
    petal_length: '1.4',
    petal_width: '0.2',
  });

  const [result, setResult] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // 2. ฟังก์ชันเมื่อมีการพิมพ์เปลี่ยนค่า
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. ฟังก์ชันส่งข้อมูลไปหา Backend (FastAPI)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // แปลงข้อมูลเป็นตัวเลขก่อนส่ง
      const numericData = {
        sepal_length: parseFloat(formData.sepal_length),
        sepal_width: parseFloat(formData.sepal_width),
        petal_length: parseFloat(formData.petal_length),
        petal_width: parseFloat(formData.petal_width),
      };

      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(numericData),
      });

      const data = await response.json();
      
      if (data.species) {
        setResult(data.species);
        setConfidence(data.confidence);
      } else {
        alert('เกิดข้อผิดพลาด: ' + JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
      alert('เชื่อมต่อ Backend ไม่ได้ (เช็คว่าเปิด Server หรือยัง?)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
         Iris Flower Predictor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sepal Length</label>
            <input
              type="number"
              step="0.1"
              name="sepal_length"
              value={formData.sepal_length}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sepal Width</label>
            <input
              type="number"
              step="0.1"
              name="sepal_width"
              value={formData.sepal_width}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Petal Length</label>
            <input
              type="number"
              step="0.1"
              name="petal_length"
              value={formData.petal_length}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Petal Width</label>
            <input
              type="number"
              step="0.1"
              name="petal_width"
              value={formData.petal_width}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} 
              transition duration-150`}
          >
            {loading ? 'Processing...' : 'Predict Species'}
          </button>
        </form>

        {/* ส่วนแสดงผลลัพธ์ */}
        {result && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 text-center animate-pulse">
            <p className="text-sm text-green-600">Prediction Result:</p>
            <p className="text-3xl font-bold text-green-800 my-2">{result}</p>
            <p className="text-xs text-gray-500">Confidence: {(confidence! * 100).toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
}