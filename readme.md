
**1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?**

**উত্তর:** 
DOM থেকে এলিমেন্ট সিলেক্ট করার জন্য এই মেথডগুলো ব্যবহার করা হয়।

01 `getElementById`: শুধুমাত্র একটি নির্দিষ্ট ID সম্পন্ন এলিমেন্টকে রিটার্ন করে। এটি একটি সিঙ্গেল এলিমেন্ট দেয়।
02 `getElementsByClassName`: নির্দিষ্ট ক্লাসের সকল এলিমেন্টকে একটি "HTMLCollection" হিসেবে রিটার্ন করে।
03 `querySelector`: CSS সিলেক্টর ব্যবহার করে প্রথম যে এলিমেন্টটি পায় সেটি রিটার্ন করে।
04 `querySelectorAll`: CSS সিলেক্টর ব্যবহার করে সবকটি ম্যাচিং এলিমেন্টকে  রিটার্ন করে।

**উদাহরণ:**

// ১. ID দিয়ে (একটি এলিমেন্ট পাবে)
`const header = document.getElementById('main-title');`

// ২. Class দিয়ে (সবগুলো এলিমেন্ট পাবে)
`const items = document.getElementsByClassName('list-item');`

// ৩. querySelector (প্রথমটির এলিমেন্ট পাবে)
`const firstBtn = document.querySelector('.btn');`

// ৪. querySelectorAll (সবগুলো এলিমেন্ট পাবে)
`const allBtns = document.querySelectorAll('.btn');`


**2. How do you create and insert a new element into the DOM?**

উত্তর:
নতুন এলিমেন্ট তৈরি করার জন্য `document.createElement()` ব্যবহার করা হয় এবং সেটিকে DOM-এ যুক্ত করার জন্য `appendChild()` বা `prepend()` ব্যবহার করা হয়।

ধাপগুলো:
১. এলিমেন্ট তৈরি করা।
২. টেক্সট বা স্টাইল যোগ করা।
৩. প্যারেন্ট এলিমেন্টের ভেতরে ঢুকিয়ে দেওয়া।

**উদাহরণ:**

`const newPara = document.createElement('p');`
`newPara.textContent = "new paragraph text";`
`const container = document.getElementById('container');`
`container.appendChild(newPara);`


**3. What is Event Bubbling? And how does it work?**


উত্তর:
`Event Bubbling` হলো এমন একটি প্রক্রিয়া যেখানে কোনো চাইল্ড এলিমেন্টে ইভেন্ট ঘটলে, সেই ইভেন্টটি ক্রমান্বয়ে তার প্যারেন্ট এলিমেন্টগুলোর দিকে উপরের দিকে উঠতে থাকে।

কিভাবে কাজ করে:
যদি একটি বাটনে ক্লিক করা হয় এবং সেই বাটনটি একটি ডিভ-এর ভেতরে থাকে, তবে প্রথমে বাটনের ইভেন্ট কাজ করবে, তারপর ডিভ-এর ইভেন্ট কাজ করবে। একেই বাবলিং বলে।

**উদাহরণ:**

`document.querySelector('div').addEventListener('click', function(){`
`    console.log('Div Clicked')`
`});`
`document.querySelector('button').addEventListener('click', function(){`
`    console.log('Button Clicked')`
`});`


**4. What is Event Delegation in JavaScript? Why is it useful?**


উত্তর:
`Event Delegation` হলো এমন একটি পদ্ধতি যেখানে প্রতিটি চাইল্ড এলিমেন্টে আলাদাভাবে ইভেন্ট লিসেনার না বসিয়ে, তাদের কমন প্যারেন্ট এলিমেন্টে একটি মাত্র ইভেন্ট লিসেনার বসানো হয়।

কেন দরকারী:
১. মেমোরি বাঁচে (যদি ১০০টি লিস্ট আইটেম থাকে, তবে ১০০টি লিসেনারের বদলে ১টি লিসেনার দিলেই হয়)।
২. নতুন কোনো আইটেম পরে যোগ করলেও সেটি অটোমেটিক ইভেন্ট পেয়ে যায়।

**উদাহরণ:**

`document.getElementById('myList').addEventListener('click', function(event) {`
`    if (event.target.tagName === 'LI') {`
`        console.log("আইটেম ক্লিক হয়েছে: " + event.target.innerText);`
`    }`
`});`


**5. What is the difference between preventDefault() and stopPropagation() methods?**

উত্তর:

এই দুটি মেথড ইভেন্ট কন্ট্রোল করতে ব্যবহৃত হলেও এদের কাজ আলাদা:
`preventDefault()`: এটি ব্রাউজারের কোনো ডিফল্ট কাজ থামিয়ে দেয়। যেমন: লিঙ্কে ক্লিক করলে পেজ লোড হওয়া বা ফর্ম সাবমিট হওয়া আটকানো।
`stopPropagation()`: এটি ইভেন্টকে প্যারেন্ট এলিমেন্টের দিকে বাবলিং হতে বাধা দেয়। অর্থাৎ ইভেন্টটি আর উপরের দিকে যাবে না।

**উদাহরণ:**

`document.querySelector('a').addEventListener('click', function(e) {`
`    e.preventDefault();`
`    console.log("লিঙ্ক ক্লিক হয়েছে কিন্তু অন্য পেজে যাবে না।");`
`});`

`document.querySelector('button').addEventListener('click', function(e) {`
`    e.stopPropagation();`
`    console.log("শুধুমাত্র বাটনের কাজ হবে।");`
`});`



