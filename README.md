# K4_Track01_Day18_2A202601236_CaoCacTuong

**Track 1 · Day 18 — Finding and Validating Pain Points**
**Case đã chọn:** Case A — AI Tutor: Diagnostic Refresher

---

## 1. Thông tin cá nhân & nhóm

| | |
|---|---|
| **Mã sinh viên (MHV)** | 2A202601236 |
| **Họ và tên** | Cao Các Tường |
| **Tên nhóm** | Hihi |
| **Thành viên** | Cao Các Tường (2A202601236) · Đinh Lê Quỳnh Phương (2A202601865) |
| **Case đã chọn** | Case A — AI Tutor: Diagnostic Refresher |

---

## 2. Problem Hypothesis Brief (kết quả Chặng 1)

> **Khi learner tự học, đang đọc một slide nhưng không hiểu một phần nào đó (đọc lại nhiều lần vẫn
> không nối được ý, không nắm được khái niệm đang được nói đến), họ không xác định được mình đang thiếu
> khái niệm nền nào, nên không biết phải tra cứu hay hỏi cái gì. Kết quả là họ mất 20–40 phút tra cứu
> lan man và hiểu lệch, hoặc bỏ qua và học tiếp trong trạng thái hổng — làm các bài phụ thuộc sau đó
> càng khó và tăng nguy cơ bỏ dở khoá học.**

---

## 3. Chặng 2 — Chọn ba Solution Options (GATE 2)

> Problem ở Chặng 1 thuần về **đọc slide không hiểu**; còn ở Chặng 2, ba solution khác nhau ở **cách AI
> tìm ra learner đang thiếu khái niệm nền nào** (hỏi / quan sát / đối thoại) — đây là công cụ của
> solution, không phải tình huống của problem.

### 3.1. Giữ nguyên cho cả A/B/C

| Thành phần | Quyết định chung |
|---|---|
| Target user | Learner sử dụng slide để tự học trong khoá online, đang học dở một bài cụ thể |
| Situation | Đọc slide không hiểu một phần nào đó (đọc lại nhiều lần vẫn không nối được ý) |
| Task | Xác định khái niệm nền đang thiếu và nhận refresher để tiếp tục |
| Desired outcome | Nhận diện đúng gap, bù kiến thức trong vài phút (thay vì 20–40'), tiếp tục bài không hổng |
| Content/data fixture | Slide bài giảng (text), concept graph các khái niệm nền + link refresher tương ứng |

### 3.2. Khác nhau giữa A/B/C

| Thành phần | Option A — **Reactive** | Option B — **Proactive** | Option C — **Collaborative** |
|---|---|---|---|
| **AI giống như...** | Thầy giáo **hỏi** để tìm ra learner chưa hiểu chỗ nào | Thầy giáo **quan sát** learner dán mắt vào một phần lâu, tự đoán rồi gợi ý | Learner **tự nói** "em không hiểu đoạn này" và thầy **đối thoại** lại để chốt đúng gap |
| **Solution mechanism** | AI gắn sẵn "checkpoint hiểu bài" (1 câu hỏi ngắn theo từng phần của slide); learner trả lời ngay trên slide. Sai/không chắc → AI mở chuỗi 2–3 câu chẩn đoán (adaptive branching) khoanh vùng khái niệm nền → refresher + 1 câu kiểm tra lại | AI âm thầm theo dõi hành vi đọc (thời gian ở một phần, đọc lại nhiều lần, cuộn lên xuống lặp lại), dựng "giả thuyết gap" mà không hỏi; chỉ hiện card nhẹ "Có vẻ bạn vướng X" kèm nút mở refresher 1 chạm | Learner chủ động bấm "Em mắc chỗ này" và mô tả bằng lời (hoặc dán đoạn khó hiểu); AI đối thoại Socratic: hỏi 1–2 câu làm rõ → ánh xạ vào concept graph → refresher → xin xác nhận |
| **User làm gì** | Đọc slide; trả lời checkpoint ngay trên slide; nếu sai, trả lời chuỗi câu hỏi chẩn đoán | Học như bình thường; khi card hiện, chạm mở hoặc bỏ qua | Khởi động, mô tả sự bối rối bằng lời tự nhiên, trả lời câu làm rõ, xác nhận chẩn đoán |
| **AI làm gì** | Chèn checkpoint, chấm, chọn câu hỏi tiếp theo, khoanh vùng gap, chọn refresher từ concept graph, kiểm tra lại | Mô hình hoá hiểu biết từ tín hiệu hành vi, xếp hạng khái niệm khả nghi, viết gợi ý + refresher, học từ việc bị bỏ qua | Parse mô tả, so khớp concept graph, hỏi làm rõ nếu mơ hồ, sinh refresher, điều chỉnh theo phản hồi |
| **Trigger** | Trả lời sai checkpoint trên slide (hoặc bấm "Mình không hiểu phần này") | Tín hiệu hành vi đọc: đọc lại quá N lần, dừng lâu ở một phần, cuộn lên xuống lặp lại | Learner khởi động (nút/chat) — hoặc gợi ý của B dẫn vào C |
| **Trade-off chính** | Chẩn đoán chuẩn, ngay trong luồng đọc; nhưng hơi gián đoạn vì bị hỏi, cảm giác bị "kiểm tra" khi đang đọc | Không gián đoạn, proactive; nhưng chỉ là xác suất — có thể sai/gây khó chịu; cold-start yếu | Chính xác + tôn trọng quyền learner nhất; nhưng đòi learner mô tả được vấn đề — đúng cái họ thiếu; friction cao với người nhút nhát |
