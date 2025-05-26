function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function submitPost() {
  const title = document.getElementById("itemTitle").value;
  const city = document.getElementById("city").value;
  const desc = document.getElementById("itemDesc").value;
  const image = document.getElementById("itemImage").files[0];

  const post = {
    title,
    city,
    desc,
    imageURL: image ? URL.createObjectURL(image) : ''
  };

  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
  alert("تم إرسال الغرض بنجاح.");
  showPosts();
  showSection('chat');
}

function showPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.forEach((post, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.city} - ${post.desc}</p>
      ${post.imageURL ? `<img src="${post.imageURL}" width="100">` : ''}
    `;
    postList.appendChild(div);
  });
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const chatBox = document.getElementById("chatBox");
  const message = input.value.trim();
  if (message) {
    const p = document.createElement("p");
    p.textContent = `أنت: ${message}`;
    chatBox.appendChild(p);
    input.value = "";

    // simulate admin reply
    setTimeout(() => {
      const reply = document.createElement("p");
      reply.textContent = "الإدارة: سيتم مراجعة الطلب.";
      chatBox.appendChild(reply);
    }, 1000);
  }
}

function loginAdmin() {
  const pass = document.getElementById("adminPass").value;
  if (pass === "karem.tl123321") {
    showSection("adminPanel");
    loadAdminPosts();
  } else {
    alert("كلمة المرور خاطئة");
  }
}

function loadAdminPosts() {
  const adminPosts = document.getElementById("adminPosts");
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  adminPosts.innerHTML = "";
  posts.forEach((post, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.city} - ${post.desc}</p>
      ${post.imageURL ? `<img src="${post.imageURL}" width="100">` : ''}
      <button onclick="approvePost(${index})">موافقة</button>
      <button onclick="deletePost(${index})">حذف</button>
    `;
    adminPosts.appendChild(div);
  });
}

function approvePost(index) {
  alert("تمت الموافقة على الغرض.");
}

function deletePost(index) {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  loadAdminPosts();
}
