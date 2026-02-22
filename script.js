        let interViewList = [];
        let rejectsList = [];

        // Elements
        let allJobsCount = document.getElementById("all-jobs-count");
        let interViewJobsCount = document.getElementById("interview-jobs-count");
        let rejectJobsCount = document.getElementById("reject-jobs-count");
        let mainBox = document.getElementById("main-job-box");
        let filterSection = document.getElementById("filter-section");

        // Top counter update function
        function updateCounts() {
            allJobsCount.innerText = mainBox.children.length;
            document.getElementById("all-jobs-child").innerText = mainBox.children.length;
            interViewJobsCount.innerText = interViewList.length;
            rejectJobsCount.innerText = rejectsList.length;
        }
        updateCounts();

        // Buttons
        let allJobButton = document.getElementById("job-find-All-button");
        let allInterviewButton = document.getElementById("job-find-interview-button");
        let allRejectButton = document.getElementById("job-find-reject-button");

        // Tab Toggle Logic
        function toggleStyle(id) {
            allJobButton.className = "btn bg-gray-300 text-black";
            allInterviewButton.className = "btn bg-gray-300 text-black";
            allRejectButton.className = "btn bg-gray-300 text-black";

            let clickedButton = document.getElementById(id);
            clickedButton.className = "btn bg-black text-white";

            if (id === 'job-find-interview-button') {
                mainBox.classList.add('hidden');
                filterSection.classList.remove('hidden');
                renderApprove(); 
            } else if (id === 'job-find-All-button') {
                mainBox.classList.remove('hidden');
                filterSection.classList.add('hidden');
            } else if (id === 'job-find-reject-button') {
                mainBox.classList.add('hidden');
                filterSection.classList.remove('hidden');
                renderRejected(); 
            }
        }

        // Main box এর বাটন স্ট্যাটাস আপডেট করার ফাংশন (যেন All Tabs এ গেলে ডাটা ঠিক থাকে)
        function updateMainBoxUI(jobName, status) {
            const titles = document.querySelectorAll('#main-job-box .job_title');
            titles.forEach(title => {
                if (title.innerText === jobName) {
                    const card = title.closest('.job-card');
                    const statusBtn = card.querySelector('.status-btn');
                    if (status === 'interview') {
                        statusBtn.innerText = "INTERVIEWING";
                        statusBtn.className = "btn btn-sm status-btn bg-green-500 text-white border-none";
                    } else if (status === 'rejected') {
                        statusBtn.innerText = "REJECTED";
                        statusBtn.className = "btn btn-sm status-btn bg-red-500 text-white border-none";
                    }
                }
            });
        }

        // Global Event Listener (যেকোনো ট্যাব থেকে কাজ করবে)
        document.addEventListener('click', function(event) {
            const isInterviewBtn = event.target.classList.contains("interview-btn");
            const isRejectedBtn = event.target.classList.contains("rejected-btn");
            const isDeleteBtn = event.target.classList.contains("delete-btn");

            // যদি এই ৩টি বাটনের বাইরে ক্লিক হয়, তবে কিছুই হবে না
            if (!isInterviewBtn && !isRejectedBtn && !isDeleteBtn) return;

            const parentNode = event.target.closest('.job-card');
            if(!parentNode) return;

            const jobName = parentNode.querySelector('.job_title').innerText;
            
            // --- DELETE LOGIC ---
            if (isDeleteBtn) {
                let confirmDelete = confirm("Are you sure you want to delete this job?");
                if (confirmDelete) {
                    interViewList = interViewList.filter(item => item.jobName !== jobName);
                    rejectsList = rejectsList.filter(item => item.jobName !== jobName);
                    
                    const titles = document.querySelectorAll('#main-job-box .job_title');
                    titles.forEach(title => {
                        if (title.innerText === jobName) {
                            title.closest('.job-card').remove();
                        }
                    });

                    updateCounts();

                    // আপনি যদি Filtered ট্যাবে থাকেন, সাথে সাথে সেটা রিমুভ করে দিবে
                    if (!filterSection.classList.contains('hidden')) {
                        if (allInterviewButton.classList.contains('bg-black')) renderApprove();
                        else if (allRejectButton.classList.contains('bg-black')) renderRejected();
                    }
                }
                return;
            }

            // ডেটা কালেকশন 
            const jobSkill = parentNode.querySelector('.job_skill').innerText;
            const jobSalary = parentNode.querySelector('.job_salary').innerText;
            const jobDetails = parentNode.querySelector('.job_details').innerText;
            const jobData = { jobName, jobSkill, jobSalary, jobDetails };

            // --- INTERVIEW BUTTON LOGIC ---
            if (isInterviewBtn) {
                rejectsList = rejectsList.filter(item => item.jobName !== jobName); // রিজেক্ট লিস্টে থাকলে বাদ দিবে
                if (!interViewList.find(item => item.jobName === jobName)) {
                    interViewList.push(jobData); // ইন্টারভিউ লিস্টে যোগ করবে
                }
                updateMainBoxUI(jobName, 'interview');
            }

            // --- REJECTED BUTTON LOGIC ---
            if (isRejectedBtn) {
                interViewList = interViewList.filter(item => item.jobName !== jobName); // ইন্টারভিউ লিস্টে থাকলে বাদ দিবে
                if (!rejectsList.find(item => item.jobName === jobName)) {
                    rejectsList.push(jobData); // রিজেক্ট লিস্টে যোগ করবে
                }
                updateMainBoxUI(jobName, 'rejected');
            }

            updateCounts();

            // যদি ফিল্টার ট্যাবের ভেতরে থেকে বাটন চাপেন, তবে সাথে সাথে রেন্ডার (Refersh) করে জব সরিয়ে দিবে
            if (!filterSection.classList.contains('hidden')) {
                if (allInterviewButton.classList.contains('bg-black')) {
                    renderApprove(); 
                } else if (allRejectButton.classList.contains('bg-black')) {
                    renderRejected(); 
                }
            }
        });

        // Render Interview List
        function renderApprove() {
            filterSection.innerHTML = ""; 
            if(interViewList.length === 0){
                filterSection.innerHTML = "<h2 class='mt-5 font-bold text-center text-green-600'>No jobs in Interview list yet.</h2>";
                return;
            }
            for (let interview of interViewList) {
                let div = document.createElement('div');
                div.innerHTML = `
                <div class="job-card" style="margin-top: 20px; padding: 15px; background-color: #E8F5E9; border-radius: 8px; border: 1px solid #4CAF50;">
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span>
                                <h2 class="font-bold text-xl text-green-700 job_title">${interview.jobName}</h2>
                                <p class="job_skill text-gray-600">${interview.jobSkill}</p>
                            </span>
                            <i class="fa-solid fa-trash-can text-red-500 cursor-pointer text-xl delete-btn"></i>
                        </div>
                        <p class="job_salary font-semibold">${interview.jobSalary}</p>
                        <button class="btn btn-sm status-btn bg-green-500 text-white border-none">INTERVIEWING</button>
                        <p class="job_details text-gray-600">${interview.jobDetails}</p>
                        <div class="flex gap-4 mt-3">
                            <button class="btn btn-primary interview-btn">INTERVIEW</button>
                            <button class="btn btn-error rejected-btn text-white">REJECTED</button>
                        </div>
                    </div>
                </div>`;
                filterSection.appendChild(div);
            }
        }

        // Render Rejected List
        function renderRejected() {
            filterSection.innerHTML = ""; 
            if(rejectsList.length === 0){
                filterSection.innerHTML = "<h2 class='mt-5 font-bold text-center text-red-600'>No jobs in Rejected list yet.</h2>";
                return;
            }
            for (let reject of rejectsList) {
                let div = document.createElement('div');
                div.innerHTML = `
                <div class="job-card" style="margin-top: 20px; padding: 15px; background-color: #FFEBEE; border-radius: 8px; border: 1px solid #F44336;">
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span>
                                <h2 class="font-bold text-xl text-red-700 job_title">${reject.jobName}</h2>
                                <p class="job_skill text-gray-600">${reject.jobSkill}</p>
                            </span>
                            <i class="fa-solid fa-trash-can text-red-500 cursor-pointer text-xl delete-btn"></i>
                        </div>
                        <p class="job_salary font-semibold">${reject.jobSalary}</p>
                        <button class="btn btn-sm status-btn bg-red-500 text-white border-none">REJECTED</button>
                        <p class="job_details text-gray-600">${reject.jobDetails}</p>
                        <div class="flex gap-4 mt-3">
                            <button class="btn btn-primary interview-btn">INTERVIEW</button>
                            <button class="btn btn-error rejected-btn text-white">REJECTED</button>
                        </div>
                    </div>
                </div>`;
                filterSection.appendChild(div);
            }
        }