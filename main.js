import './style.css';

// 1. เลือก DOM Elements ที่ต้องการใช้งาน
const resultEl = document.getElementById('resultEl');
const lengthEl = document.getElementById('lengthEl');
const lengthValue = document.getElementById('lengthValue');
const uppercaseEl = document.getElementById('uppercaseEl');
const lowercaseEl = document.getElementById('lowercaseEl');
const numbersEl = document.getElementById('numbersEl');
const symbolsEl = document.getElementById('symbolsEl');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

// 2. ชุดตัวอักษรสำหรับสร้างรหัสผ่าน
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// 3. สร้างฟังก์ชันสำหรับสร้างรหัสผ่าน
function generatePassword() {
  // ดึงค่าการตั้งค่าจากผู้ใช้
  const length = +lengthEl.value; // + เพื่อแปลงเป็นตัวเลข
  const includeUppercase = uppercaseEl.checked;
  const includeLowercase = lowercaseEl.checked;
  const includeNumbers = numbersEl.checked;
  const includeSymbols = symbolsEl.checked;

  // สร้างคลังตัวอักษรตามที่ผู้ใช้เลือก
  let availableChars = '';
  if (includeUppercase) availableChars += uppercaseChars;
  if (includeLowercase) availableChars += lowercaseChars;
  if (includeNumbers) availableChars += numberChars;
  if (includeSymbols) availableChars += symbolChars;
  
  // กรณีผู้ใช้ไม่ได้เลือกอะไรเลย
  if (availableChars.length === 0) {
    return 'โปรดเลือกอย่างน้อย 1 ตัวเลือก';
  }

  // เริ่มสร้างรหัสผ่าน
  let generatedPassword = '';
  for (let i = 0; i < length; i++) {
    // สุ่ม index จากคลังตัวอักษร
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    // นำตัวอักษรที่สุ่มได้มาต่อกัน
    generatedPassword += availableChars[randomIndex];
  }

  return generatedPassword;
}

// 4. เพิ่ม Event Listeners

// เมื่อกดปุ่ม "สร้างรหัสผ่าน"
generateBtn.addEventListener('click', () => {
  const password = generatePassword();
  resultEl.value = password;
});

// เมื่อกดปุ่ม "คัดลอก"
copyBtn.addEventListener('click', () => {
  const passwordToCopy = resultEl.value;

  // ถ้าไม่มีรหัสผ่านในช่อง input จะไม่ทำอะไร
  if (!passwordToCopy || passwordToCopy.startsWith('โปรดเลือก')) {
    return;
  }
  
  // ใช้ Clipboard API (วิธีที่ทันสมัยและปลอดภัย)
  navigator.clipboard.writeText(passwordToCopy)
    .then(() => {
      // แจ้งผู้ใช้ว่าคัดลอกสำเร็จ
      copyBtn.innerText = 'คัดลอกแล้ว!';
      // เปลี่ยนกลับเป็นข้อความเดิมใน 1.5 วินาที
      setTimeout(() => {
        copyBtn.innerText = 'คัดลอก';
      }, 1500);
    })
    .catch(err => {
      console.error('ไม่สามารถคัดลอกได้: ', err);
      alert('เกิดข้อผิดพลาดในการคัดลอก');
    });
});

// อัปเดตตัวเลขความยาวเมื่อผู้ใช้เลื่อน slider
lengthEl.addEventListener('input', (e) => {
  lengthValue.innerText = e.target.value;
});

// สร้างรหัสผ่านครั้งแรกเมื่อเปิดหน้าเว็บ
const initialPassword = generatePassword();
resultEl.value = initialPassword;
