let interViewList = [];
let rejectsList = [];

//All Elements ID Connect
let allJobsCount = document.getElementById("all-jobs-count");
let interViewJobsCount = document.getElementById("interview-jobs-count");
let rejectJobsCount = document.getElementById("reject-jobs-count");
let mainBox = document.getElementById("main-job-box");
let filterSection = document.getElementById("filter-section");
let interviewAndRejictCount = document.getElementById("interview-And-Rejict-Count");
// console.log(interViewJobsCount.innerText)

// All Buttons ID Connect
let allJobButton = document.getElementById("job-find-All-button");
let allInterviewButton = document.getElementById("job-find-interview-button");
let allRejectButton = document.getElementById("job-find-reject-button");

// Count Funtion 
function updateCounts() {
    allJobsCount.innerText = mainBox.children.length;
    interViewJobsCount.innerText = interViewList.length;
    rejectJobsCount.innerText = rejectsList.length;
}
// All Job Inertext Change
function totalJOb() {
    document.getElementById("all-jobs-child").innerText = mainBox.children.length;
}

// Interview List Count Update
function jobFindInterviewButton() {
    if (interviewAndRejictCount) {
        interviewAndRejictCount.innerText = interViewList.length + " of ";
    }
}

// Rejict List Count Update
function jobFindRejectButton() {
    if (interviewAndRejictCount) {
        interviewAndRejictCount.innerText = rejectsList.length + " of ";
    }
}

// Open Tab Find And Count Update
function updateActiveTabCount() {
    if (allInterviewButton.classList.contains('bg-black')) {
        jobFindInterviewButton();
    } else if (allRejectButton.classList.contains('bg-black')) {
        jobFindRejectButton();
    } else {
        totalJOb();
    }
}

// funtion call
updateCounts();
totalJOb();

// Tab Toggle Some Style Change
function toggleStyle(id) {
    allJobButton.className = "btn bg-gray-300 text-black";
    allInterviewButton.className = "btn bg-gray-300 text-black";
    allRejectButton.className = "btn bg-gray-300 text-black";

    let clickedButton = document.getElementById(id);
    clickedButton.className = "btn bg-black text-white";

    if (id === 'job-find-interview-button') {
        mainBox.classList.add('hidden');
        filterSection.classList.remove('hidden');
        interviewAndRejictCount.classList.remove("hidden") 
        renderApprove();
        jobFindInterviewButton(); 
    } else if (id === 'job-find-All-button') {
        mainBox.classList.remove('hidden');
        interviewAndRejictCount.classList.add("hidden")
        filterSection.classList.add('hidden');
        totalJOb();
    } else if (id === 'job-find-reject-button') {
        mainBox.classList.add('hidden');
        filterSection.classList.remove('hidden');
        interviewAndRejictCount.classList.remove("hidden")
        renderRejected();
        jobFindRejectButton(); 
    }
}

// Main Update function UI
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

// add Event Listener and funtion 
document.addEventListener('click', function (event) {
    const isInterviewBtn = event.target.classList.contains("interview-btn");
    const isRejectedBtn = event.target.classList.contains("rejected-btn");
    const isDeleteBtn = event.target.classList.contains("delete-btn");

    if (!isInterviewBtn && !isRejectedBtn && !isDeleteBtn) {
        return;
    }

    const parentNode = event.target.closest('.job-card');
    if (!parentNode) {
        return;
    }

    const jobName = parentNode.querySelector('.job_title').innerText;

    if (isDeleteBtn) {
            interViewList = interViewList.filter(item => item.jobName !== jobName);
            rejectsList = rejectsList.filter(item => item.jobName !== jobName);

            const titles = document.querySelectorAll('#main-job-box .job_title');
            titles.forEach(title => {
                if (title.innerText === jobName) title.closest('.job-card').remove();
            });

            updateCounts();
            if (!filterSection.classList.contains('hidden')) {
                if (allInterviewButton.classList.contains('bg-black')) renderApprove();
                else if (allRejectButton.classList.contains('bg-black')) renderRejected();
            }
            updateActiveTabCount(); 
        return;
    }

    // Object Creat
    const jobSkill = parentNode.querySelector('.job_skill').innerText;
    const jobSalary = parentNode.querySelector('.job_salary').innerText;
    const jobDetails = parentNode.querySelector('.job_details').innerText;
    const jobData = { jobName, jobSkill, jobSalary, jobDetails };

    // Object push in Interview Array
    if (isInterviewBtn) {
        rejectsList = rejectsList.filter(item => item.jobName !== jobName);
        if (!interViewList.find(item => item.jobName === jobName)) interViewList.push(jobData);
        updateMainBoxUI(jobName, 'interview');
    }

    // Object Push Reject Array
    if (isRejectedBtn) {
        interViewList = interViewList.filter(item => item.jobName !== jobName);
        if (!rejectsList.find(item => item.jobName === jobName)) rejectsList.push(jobData);
        updateMainBoxUI(jobName, 'rejected');
    }

    updateCounts();

    if (!filterSection.classList.contains('hidden')) {
        if (allInterviewButton.classList.contains('bg-black')) renderApprove();
        else if (allRejectButton.classList.contains('bg-black')) renderRejected();
    }

    updateActiveTabCount(); 
});




// Blank Interview Page Loadded
function renderApprove() {
    filterSection.innerHTML = ""; 
    if(interViewList.length === 0){
        filterSection.innerHTML = `<div class="flex items-center justify-center px-4 mt-10">
            <div class="flex flex-col items-center justify-center text-center 
                bg-white shadow-lg rounded-2xl p-10 w-full 
                border border-gray-100">

                <!-- Icon -->
                <div class="flex items-center justify-center w-24 h-24 
                            rounded-full bg-blue-100 mb-6">
                    <i class="fa-regular fa-file-lines text-5xl text-blue-500"></i>
                </div>

                <!-- Title -->
                <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                    No Jobs Available
                </h1>

                <!-- Description -->
                <p class="mt-3 text-gray-500 text-sm md:text-base">
                    Check back soon for new job opportunities.
                </p>
                </div>
            </div>`;
        return;
    }

    // Dynamick Interview Data Loaded
    interViewList.forEach(interview => {
        let div = document.createElement('div');
        div.innerHTML = `<div class="job-card" style="margin-top: 20px; padding: 15px; background-color: #E8F5E9; border-radius: 8px; border: 1px solid #4CAF50;">
            <div class="space-y-2">
                <div class="flex justify-between">
                    <span>
                        <h2 class="font-bold text-xl text-green-700 job_title">${interview.jobName}</h2>
                        <p class="job_skill text-gray-600">${interview.jobSkill}</p>
                    </span>
                    <i class="fa-solid fa-trash-can text-red-500 cursor-pointer text-xl delete-btn" onclick="my_modal_1.showModal()"></i>
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
    });
}

// Blank Reject Page Loaded
function renderRejected() {
    filterSection.innerHTML = ""; 
    if(rejectsList.length === 0){
        filterSection.innerHTML =`<div class="flex items-center justify-center px-4 mt-10">
            <div class="flex flex-col items-center justify-center text-center 
                    bg-white shadow-lg rounded-2xl p-10 w-full 
                    border border-gray-100">
                    <!-- Icon -->
                    <div class="flex items-center justify-center w-24 h-24 
                                rounded-full bg-blue-100 mb-6">
                        <i class="fa-regular fa-file-lines text-5xl text-blue-500"></i>
                    </div>
                    <!-- Title -->
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                        No Jobs Available
                    </h1>
                    <!-- Description -->
                    <p class="mt-3 text-gray-500 text-sm md:text-base">
                        Check back soon for new job opportunities.
                    </p>
                </div>
            </div>`;
        return;
    }

    // Dynamic Reject Data Loaded
    rejectsList.forEach(reject => {
        let div = document.createElement('div');
        div.innerHTML = `<div class="job-card" style="margin-top: 20px; padding: 15px; background-color: #FFEBEE; border-radius: 8px; border: 1px solid #F44336;">
            <div class="space-y-2">
                <div class="flex justify-between">
                    <span>
                        <h2 class="font-bold text-xl text-red-700 job_title">${reject.jobName}</h2>
                        <p class="job_skill text-gray-600">${reject.jobSkill}</p>
                    </span>
                    <i class="fa-solid fa-trash-can text-red-500 cursor-pointer text-xl delete-btn" onclick="my_modal_1.showModal()"></i>
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
    });
}

