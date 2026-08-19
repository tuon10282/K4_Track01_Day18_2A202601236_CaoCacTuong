# Implementation Plan: Chặng 3 & Chặng 4 — Human–AI Design & Micro-Prototypes (Day 18 — Case A)

> **Cập nhật iteration hiện tại (18/08/2026):** Kế hoạch bên dưới được giữ lại như lịch sử thiết kế ban đầu. Bản đã build hiện tại bỏ trigger ẩn, timer giả lập và confidence 78%; flow thực tế dùng `Context → Critical interaction → Decision`, confidence 68% cho Option B và facilitator mode tại `?facilitator=1`. Xem `README.md` và `test_verification.md` để đối chiếu bản đang chạy.

> **Case đã chọn**: Case A — AI Tutor: Diagnostic Refresher  
> **Thành viên**: Cao Các Tường (2A202601236) · Đinh Lê Quỳnh Phương (2A202601865) — Nhóm Hihi  

---

## 1. Đối chiếu Tiêu chuẩn Checkpoint (CP Compliance Matrix)

| Yêu cầu Checkpoint (CP) | Mức độ bám sát & Nội dung triển khai |
|---|---|
| **Chặng 3: 1. Bốn quyết định thiết kế** | **Đạt 100%**: Phân tích chi tiết 4 khía cạnh cho 3 Option A/B/C:<br>• *Expectation*: User hiểu AI chẩn đoán gap (không làm bài hộ); rõ capability/limit.<br>• *Role & Agency*: Phân định User vs AI; định nghĩa *Ask*, *Suggest/Wait*, *Converse*; rủi ro & chi phí khi AI đoán sai.<br>• *Evidence & Uncertainty*: Tín hiệu AI dựa vào (quiz sai, dwell time 45s, prompt user); độ tự tin (Confidence %).<br>• *Control & Recovery*: Vị trí Dismiss, Edit, Reject, Re-diagnose, và đường tiếp tục slide ban đầu. |
| **Chặng 3: 2. Human–AI Decision Table** | **Đạt 100%**: Xây dựng bảng ma trận 3 cột (Option A, B, C) x 5 hàng đúng mẫu:<br>1. User làm gì? AI làm gì?<br>2. AI Act / Ask / Don't Act? Vì sao?<br>3. User hiểu capability/limit bằng gì?<br>4. Evidence/uncertainty được thể hiện thế nào?<br>5. User kiểm soát và recovery thế nào?<br>+ Phần **Feedback & Data check** (phạm vi dữ liệu, quyền rút consent). |
| **Chặng 3: GATE 3 — Human control** | **Đạt 100%**: Đảm bảo từng Option thể hiện rõ ràng Agency phù hợp hậu quả sai + có đường lấy lại kiểm soát 1-touch. |
| **Chặng 4: 1. Scope chuẩn (Common Context + Critical Interaction)** | **Đạt 100%**: Thiết kế ứng dụng dùng chung **70%**: Context screen (Slide bài giảng Gradient Descent), Data fixture, UI Visual style, Task & Outcome. Chỉ khác 30% ở **Critical Interaction** và cách AI xuất hiện/phản hồi. |
| **Chặng 4: 2. Definition of Testable (GATE 4)** | **Đạt 100%**: Prototype dạng Web tương tác (HTML/CSS/JS):<br>• Tester tự bấm A/B/C không cần giải thích hộ.<br>• Bắt đầu cùng context & task.<br>• Nội dung slide + bài ôn thật.<br>• Nút **Reset về Common Context** chuẩn hóa. |
| **Chặng 4: 4. Prototype Annotation** | **Đạt 100%**: Khai báo Annotation Panel chuẩn mẫu ngoài frame (Option, We expect tester to, Watch for, Do not explain). |
| **Chặng 5 & 6: Test Protocol & Synthesis** | **Đạt 100%**: Chuẩn bị sẵn Khung câu hỏi Context, Outcome Task, 5 Observation Focuses, Facilitation Rules, Prototype Feedback Note (4 lớp: Observed, Interpreted, Decided, Still Unproven) và Group Synthesis Table (GATE 5). |

---

## 2. Chi tiết Cập nhật Chặng 3 vào `README.md`

### 2.1. Bốn quyết định thiết kế
1. **Expectation**:
   - User biết AI đóng vai trò chẩn đoán lỗ hổng kiến thức nền (Diagnostic Tutor), hỗ trợ gợi ý bài ôn ngắn (Refresher 2-3 phút), không giải hộ bài tập.
   - Giới hạn: AI chỉ tra cứu trong Concept Graph của bài học, không tự sinh nội dung kiến thức nằm ngoài giáo trình.
2. **Role and Agency**:
   - **Option A (Reactive)**: AI *Ask* (đặt checkpoint quiz trên slide), User trả lời -> AI chẩn đoán gap nếu chọn sai.
   - **Option B (Proactive)**: AI *Suggest & Wait* (tự động quan sát thời gian đọc/cuộn lặp), gợi ý card nhẹ -> User quyết định mở hay đóng.
   - **Option C (Collaborative)**: AI *Converse* (User bấm "Chỗ này khó hiểu", AI đối thoại Socratic 1-2 câu để cùng khoanh vùng gap).
3. **Evidence and Uncertainty**:
   - **Option A**: Evidence = Lựa chọn sai ở Checkpoint 1. Uncertainty = 0% (xác thực trực tiếp qua câu hỏi).
   - **Option B**: Evidence = Dừng 45s tại đoạn công thức 3.2 & cuộn 3 lần. Uncertainty = Badge "Độ tin cậy 78% (Trung bình)".
   - **Option C**: Evidence = Sơ đồ tư duy (Concept Graph) thể hiện mối liên kết giữa ý kiến learner và bài ôn.
4. **Control and Recovery**:
   - Mọi Option đều có nút **Dismiss** (Tắt card), **Preview Refresher** (Xem trước bài ôn), **Re-diagnose** (Chọn khái niệm khác), và nút **Reset** về slide ban đầu.

### 2.2. Human–AI Decision Table

| Decision Criteria | Option A — Reactive (Quiz Checkpoint) | Option B — Proactive (Behavior Observer) | Option C — Collaborative (User Dialogue) |
|---|---|---|---|
| **User làm gì? AI làm gì?** | **User**: Đọc slide, trả lời câu checkpoint chèn trên slide.<br>**AI**: Chèn câu hỏi, chấm điểm, nếu sai -> khoanh vùng gap & đưa bài ôn. | **User**: Tự do đọc slide như bình thường.<br>**AI**: Lẳng lặng theo dõi thời gian dừng & cuộn -> dự đoán gap -> hiện card gợi ý nhẹ. | **User**: Bấm "Em rối chỗ này", gõ/bôi đen đoạn khó hiểu.<br>**AI**: Đặt 1-2 câu hỏi Socratic làm rối -> ánh xạ Concept Graph -> đưa bài ôn. |
| **AI Act / Ask / Don't Act? Vì sao?** | **AI Ask**: Vì câu hỏi checkpoint giúp xác nhận chính xác kiến thức thiếu trước khi hành động, tránh đoán mò. | **AI Don't Act (Suggest & Wait)**: Vì đoán qua hành vi chỉ là xác suất. AI chỉ hiện toast card nhẹ, để User quyết định mở hay đóng. | **AI Ask & Converse**: AI hỏi lại để hướng dẫn learner tự nhận ra lỗ hổng, tôn trọng tối đa quyền kiểm soát của learner. |
| **User hiểu capability/limit bằng gì?** | Badge "AI Diagnostic Tutor: Chẩn đoán theo từng phần bài đọc". Giới hạn: Chỉ ôn tập các khái niệm nền có trong sơ đồ bài học. | Banner "Dự đoán hỗ trợ tự động". Giới hạn: Nhắc nhở gợi ý dựa trên thói quen đọc, có thể không chính xác 100%. | Prompt hướng dẫn "Hãy mô tả điều bạn chưa rõ". Giới hạn: AI giúp làm rõ khái niệm nền, không giải hộ bài tập. |
| **Evidence / Uncertainty thể hiện thế nào?** | **Evidence**: "Dựa vào lựa chọn chưa đúng của bạn tại Checkpoint 1".<br>**Uncertainty**: Rõ ràng 100% đúng/sai qua kết quả làm bài. | **Evidence**: "Bạn đã đọc đi đọc lại đoạn công thức 3.2 trong 45s".<br>**Uncertainty**: Badge "Độ tin cậy: 78% (Trung bình)". | **Evidence**: Sơ đồ tư duy (Concept Graph) hiển thị mối liên kết giữa câu hỏi và bài ôn.<br>**Uncertainty**: Nút xin xác nhận "Bài ôn này đã đúng chỗ bạn vướng chưa?". |
### 2.3. Tự kiểm GATE 2 — Meaningful options (Instance check)

**Vị trí trên Spectrum Agency:**
`USER INITIATES & CO-CREATES (Option C)` ← `AI INITIATES & ASKS (Option A)` → `AI OBSERVES & PROACTIVELY SUGGESTS (Option B)`

**3 câu đối chiếu sự khác biệt cơ chế (Instance check):**
- **A khác B vì**: Option A xác định lỗ hổng kiến thức nền bằng cách để AI chủ động đưa ra câu hỏi checkpoint chẩn đoán để learner trực tiếp kiểm tra và xác nhận độ hiểu ngay trên slide; trong khi Option B để AI lẳng lặng theo dõi hành vi đọc của learner (thời gian dừng lâu, cuộn lặp) để tự suy luận xác suất lỗ hổng và đề xuất bài ôn mà không cần tương tác qua câu hỏi.
- **B khác C vì**: Option B hoàn toàn do AI tự động phát hiện dấu hiệu ngập ngừng qua hành vi đọc và đưa ra gợi ý bài ôn mà learner không cần mở yêu cầu trước; trong khi Option C đòi hỏi learner phải chủ động khởi xướng khi nhận ra mình đọc không hiểu và mô tả sự bối rối của mình để AI phối hợp đối thoại làm rõ.
- **A khác C vì**: Option A do AI hoàn toàn dẫn dắt quy trình chẩn đoán bằng cách cài đặt sẵn câu hỏi kiểm tra trên từng phần của slide để khoanh vùng kiến thức thiếu; trong khi Option C do learner chủ động chọn vị trí khó hiểu và đưa ra mô tả ban đầu, sau đó cùng AI đối thoại Socratic để làm rõ lỗ hổng nền.

---

## 3. Kiến trúc Micro-Prototype Web (Chặng 4)

Ứng dụng web được xây dựng đơn trang (Single Page Application - SPA) với HTML/CSS/JavaScript thuần, giao diện **Modern Dark Glassmorphism**:

1. **Header Switcher**: Thanh điều hướng chọn Option A / Option B / Option C + Nút **Reset Common Context**.
2. **Common Context (70%)**:
   - **Slide bài giảng**: "Machine Learning: Gradient Descent & Partial Derivatives" (Nội dung thật, công thức math, hình ảnh).
   - **Data Fixture**: Concept Graph bài học (Derivative -> Partial Derivative -> Chain Rule -> Gradient Descent).
3. **Critical Interaction (30%)**:
   - **Option A (Reactive)**: Quiz Checkpoint nhúng ở Slide 4 -> Chọn sai -> Card chẩn đoán xuất hiện.
   - **Option B (Proactive)**: Giả lập tín hiệu dừng đọc 45s -> Toast Card hiện góc phải với Confidence Score 78%.
   - **Option C (Collaborative)**: Nút "Em chưa hiểu đoạn này" -> Hộp hội thoại Socratic + Concept Graph tương tác.
4. **Prototype Annotation Panel**:
   - Khung thông tin nằm ngoài frame slide dành cho Facilitator/Tester, hiển thị linh hoạt 3 tiêu chí: `Expect tester to`, `Watch for`, `Do not explain`.

---

## 4. Kế hoạch File và Thực thi

| File | Hành động | Mô tả nội dung |
|---|---|---|
| [README.md](file:///d:/K4_Track01_Day18_2A202601236_CaoCacTuong/README.md) | **MODIFY** | Cập nhật Chặng 3 (4 quyết định thiết kế, Decision Table, Feedback & Data Check, GATE 3) |
| [implementation_plan.md](file:///d:/K4_Track01_Day18_2A202601236_CaoCacTuong/implementation_plan.md) | **NEW** | File Kế hoạch triển khai đầy đủ bám sát Checkpoint |
| [index.html](file:///d:/K4_Track01_Day18_2A202601236_CaoCacTuong/index.html) | **NEW** | Khung HTML Single Page Application cho 3 Options & Annotation |
| [style.css](file:///d:/K4_Track01_Day18_2A202601236_CaoCacTuong/style.css) | **NEW** | Styling CSS Glassmorphism, Dark Theme, Micro-animations, Badges HSL |
| [app.js](file:///d:/K4_Track01_Day18_2A202601236_CaoCacTuong/app.js) | **NEW** | Logic JavaScript chuyển đổi A/B/C, giả lập AI triggers, Reset state |

---

## 5. Quy trình Kiểm thử & Nghiệm thu (Verification)

1. **Kiểm thử GATE 3**: Xác minh mọi Option đều có nút Dismiss, Reset và Re-diagnose.
2. **Kiểm thử GATE 4**: Chạy web prototype trên trình duyệt, thử nghiệm luồng A/B/C, kiểm tra hiển thị Annotation Panel ngoài frame và nút Reset 1-touch.
3. **Chuẩn bị Chặng 5 & 6**: Cung cấp mẫu **Prototype Feedback Note** và **Group Feedback Synthesis** để nhóm sẵn sàng mang đi test với 3 tester.
