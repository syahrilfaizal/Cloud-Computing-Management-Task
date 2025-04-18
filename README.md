# Cloud-Computing-Management-Task

## Deskripsi Proyek

Platform Manajemen Tugas dan Kolaborasi Tim yang dapat membantu tim dalam mengelola tugas, membagi tanggung jawab, dan melacak progres proyek secara efektif.


# Menjalankan Aplikasi

## 1. Membuat Virtual Environment

Untuk memulai, buatlah virtual environment di dalam proyek Anda agar dependensi yang digunakan terisolasi:

```bash
python -m venv venv
```

## 2. Mengaktifkan Virtual Environment
```bash
venv\Scripts\activate
```

## 3. Menginstall dependensi
```bash
pip install -r requirements.txt
```

## 4. Menjalankan Aplikasi dalam Docker
```bash
docker build -t flask-app .
```



## Struktur awal Folder

```
/Management-task/
├── README.md                    
├── docker-compose.yml           
├── laporan praktikum/
│   └── proposal.md               
├── backend/
│   └── db/
│       ├── schema.sql 
│   └── services/
│       ├── app.py         
│       ├── models.py         
│       └── tasks.py
│       ├── users         
│       ├── utils.py         
│       └── __init__.py           
├── frontend/                     