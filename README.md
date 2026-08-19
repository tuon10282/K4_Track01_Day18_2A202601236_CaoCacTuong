# Track 1 · Day 18 — Multiple Prototypes: Human–AI Design

Micro-prototype cho **Case A — AI Tutor: Diagnostic Refresher**.

| Thông tin | Giá trị |
|---|---|
| Nhóm | Hihi |
| Sinh viên | Cao Các Tường — 2A202601236 |
| Sinh viên | Đinh Lê Quỳnh Phương - 2A202601865 |

## Chạy prototype

App dùng HTML/CSS/JavaScript thuần, không cần cài package.

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

- Workbook Chặng 1–6: `http://127.0.0.1:4173/index.html`
- Tester prototype: `http://127.0.0.1:4173/prototype.html`
- Facilitator annotation: `http://127.0.0.1:4173/prototype.html?facilitator=1`
- State smoke test: `node tests/state-smoke.mjs` (không cần trình duyệt)
- Browser smoke test: `node tests/smoke.mjs` (cần Chrome và server ở cổng 4173)

Trang workbook dùng shell Codelab-style để trình bày đầy đủ artifact của sáu chặng. Facilitator mode đặt annotation ngoài prototype frame; tester mode không hiển thị annotation.

Workbook có navigation `Chặng 1–6`, chế độ tập trung, ghi chú lưu cục bộ, hỗ trợ facilitation, prototype nhúng ở Chặng 4 và ba Feedback Notes + Group Synthesis lưu cục bộ ở Chặng 6. Gate 5 không tự nhận đạt nếu các observation bắt buộc còn trống.

## Chặng 1 — Tổng hợp evidence (GATE 1)

**Hypothesis Problem**

> **Khi learner tự học, đang đọc một slide nhưng không hiểu một phần nào đó (đọc lại nhiều lần vẫn không nối được ý, không nắm được khái niệm đang được nói đến), họ không xác định được mình đang thiếu khái niệm nền nào, nên không biết phải tra cứu hay hỏi cái gì. Kết quả là họ mất 20–40 phút tra cứu lan man và hiểu lệch, hoặc bỏ qua và học tiếp trong trạng thái hổng — làm các bài phụ thuộc sau đó càng khó và tăng nguy cơ bỏ dở khoá học.**

**Evidence ban đầu từ hồ sơ Day 17**

- Learner đọc lại cùng một phần nhiều lần nhưng vẫn không nối được ý.
- Learner không biết nên dùng từ khóa nào để tra cứu và phải tìm kiếm lan man.
- Một workaround được ghi nhận là bỏ qua phần chưa hiểu để học tiếp.

**Still unproven**

- Chưa biết learner muốn AI chủ động đến mức nào trước khi cảm thấy bị theo dõi hoặc bị kiểm tra.
- Chưa biết evidence nào đủ thuyết phục để learner tin đề xuất bài ôn.
- Chưa biết checkpoint, proactive suggestion hay user-led flow tạo trade-off tốt nhất.

**Tự kiểm GATE 1 — Evidence continuity**

- [x] Hypothesis có user: learner tự học bằng slide.
- [x] Có situation: đọc lại một phần nhiều lần nhưng vẫn chưa hiểu.
- [x] Có job: xác định đúng khái niệm nền cần tra cứu/ôn lại.
- [x] Có barrier: không gọi tên được chỗ hổng kiến thức.
- [x] Có consequence: tra cứu lan man, hiểu lệch hoặc học tiếp với kiến thức hổng.
- [x] Có observation Day 17 và có điều vẫn chưa được chứng minh.

## Chặng 2 — Chọn ba Solution Options (GATE 2)

Problem ở Chặng 1 thuần về **đọc slide không hiểu**; ba solution khác nhau ở **cách AI tìm ra learner đang thiếu khái niệm nền nào** (hỏi / quan sát / cùng khoanh vùng). Đây là cơ chế của solution, không phải ba problem khác nhau.

### Phần giữ nguyên cho A/B/C

| Thành phần | Quyết định chung |
|---|---|
| Target user | Learner tự học bằng slide trong khóa online |
| Situation | Đọc lại công thức Gradient Descent ba lần nhưng chưa biết thiếu kiến thức nền nào |
| Task | Tìm đúng kiến thức cần ôn và quyết định bước tiếp theo |
| Desired outcome | Xác định gap, xem bài ôn ngắn và quay lại đúng slide |
| Data fixture | Slide 04, công thức cập nhật, loss curve, concept map và cùng thư viện refresher |

### Critical interaction khác nhau

| Thành phần | Option A — AI hỏi trước | Option B — AI chủ động | Option C — Bạn dẫn dắt |
|---|---|---|---|
| Mechanism | Checkpoint tự báo cáo có cấu trúc | Multi-signal dwell + mouse tracking → tiered hints | User khoanh vùng → AI hỏi làm rõ → xác nhận |
| User làm gì | Chọn điều gần nhất với chỗ chưa rõ | Đọc evidence, duyệt, sửa, ẩn hoặc tắt quan sát | Chọn phần chưa hiểu, trả lời câu làm rõ, xác nhận |
| AI làm gì | Hỏi rồi ánh xạ câu trả lời vào concept map | Đưa giả thuyết theo tier (1: pill, 2: card, 3: card + evidence) và chờ user | Hỏi một câu làm rõ, chờ user xác nhận trước khi mở bài ôn |
| Agency | **Ask** trước khi đề xuất | **Suggest**, không tự mở bài ôn | **Don't act** đến khi user khởi tạo; sau đó **Ask** |
| Trade-off | Evidence trực tiếp nhưng làm gián đoạn | Ít effort nhưng có rủi ro đoán sai/privacy | Nhiều control nhưng đòi hỏi user biết bắt đầu từ đâu |

### Solution option worksheet chi tiết

| Thành phần | Option A — **Reactive checkpoint** | Option B — **Proactive observer** | Option C — **Collaborative diagnosis** |
|---|---|---|---|
| **AI giống như...** | Thầy giáo **hỏi** để tìm ra learner chưa hiểu chỗ nào | Thầy giáo **quan sát** learner dừng lâu ở một phần, tự đoán rồi gợi ý | Learner **tự chỉ chỗ mắc** và thầy **hỏi lại** để chốt đúng gap |
| **Solution mechanism** | AI đưa checkpoint có cấu trúc. Learner chọn mô tả gần nhất với điểm chưa rõ; AI ánh xạ lựa chọn vào concept map rồi đề xuất refresher. | AI dùng dwell time (5s) + mouse activity + revisits + sidebar/back signals để tính confidence theo tier; hiện hint từ pill → card → card + evidence, chờ user quyết định. | Learner chọn phần chưa hiểu; AI hỏi một câu làm rõ; learner xác nhận trước khi mở refresher. |
| **User làm gì?** | Đọc slide, bắt đầu checkpoint, chọn mô tả, duyệt/chọn lại kết quả. | Học bình thường; khi hint hiện, đọc evidence rồi mở, sửa, ẩn hoặc tắt quan sát. | Bấm FAB, chọn khái niệm, trả lời câu làm rõ, xác nhận hoặc chọn lại. |
| **AI làm gì?** | Hỏi trước, đối chiếu câu trả lời với concept map, đề xuất đúng refresher. | Tính confidence từ 5 signals (dwell, mouse, revisits, back, sidebar); hiện hint theo tier; chờ user mở/ẩn/tắt. | Hỏi một câu làm rõ, chờ user xác nhận, mở refresher. |
| **Trigger** | Learner bấm bắt đầu checkpoint. | Dwell 5s + mouse active trên cùng trang, hoặc quay lại 2+ lần. | Learner bấm FAB (icon bottom-right). |
| **Trade-off chính** | Chẩn đoán dựa trên evidence trực tiếp nhưng làm gián đoạn luồng đọc và có thể tạo cảm giác bị kiểm tra. | Ít effort và proactive nhưng có thể đoán sai hoặc gây lo ngại privacy/cold-start. | Tôn trọng quyền learner nhất nhưng yêu cầu learner biết bắt đầu khoanh vùng từ đâu. |

**Vị trí trên spectrum agency**

```text
USER INITIATES / CO-CREATES (C)
        ← AI ASKS (A) →
AI INITIATES / USER REVIEWS (B)
```

**Distance check**

- A khác B vì A lấy evidence từ câu trả lời trực tiếp; B suy luận từ hành vi đọc.
- B khác C vì B chủ động khởi tạo; C chỉ bắt đầu khi user chọn phạm vi.
- A khác C vì A định hình câu hỏi cho learner; C để learner chọn phần công thức trước rồi AI mới hỏi làm rõ.

**Tự kiểm GATE 2 — Meaningful options**

- [x] A/B/C dùng cùng user, situation, task, desired outcome và data fixture.
- [x] Cả ba khác nhau ở mechanism và cách phân chia công việc/quyền quyết định.
- [x] Không dùng màu, layout hoặc wording làm lý do khác biệt.
- [x] Không cố tình làm một option tệ để option khác thắng.

## Chặng 3 — Human–AI Design pass (GATE 3)

### Bốn quyết định thiết kế

#### 1. Expectation

- **Option A:** Trước checkpoint, learner biết AI sẽ hỏi một câu và chỉ đối chiếu với concept map Chương 3; AI không tự kết luận từ hành vi đọc.
- **Option B:** Trước khi gợi ý, learner biết AI dùng tín hiệu đọc trong phiên. Giao diện nói rõ đây là phỏng đoán, không ghi âm và không dùng dữ liệu ngoài màn hình học.
- **Option C:** Trước khi chọn, learner biết AI chỉ phân tích phần họ chủ động khoanh vùng và cần learner xác nhận trước khi mở bài ôn.
- **Giới hạn chung:** AI chọn refresher trong thư viện có sẵn của khóa học, không giải bài hộ và không tuyên bố chẩn đoán ngoài concept map.

#### 2. Role and Agency

- **Option A — Ask trước khi Act:** AI đặt checkpoint; user tự báo cáo chỗ chưa rõ; AI đề xuất nhưng user quyết định mở bài ôn.
- **Option B — Suggest & Wait:** AI chủ động đưa một gợi ý low-stakes; user duyệt, sửa, ẩn hoặc tắt quan sát. AI không tự mở nội dung.
- **Option C — Don't Act → Ask → Wait:** User khởi tạo và chọn phạm vi; AI hỏi một câu làm rõ; user chốt kết luận.
- Nếu AI sai, user có thể mất thời gian ôn nhầm. Vì vậy cả ba chỉ preview nội dung sau một quyết định rõ của user.

#### 3. Evidence and Uncertainty

- **Option A:** Evidence là lựa chọn trực tiếp của learner; result trích nguyên cách hiểu đã chọn và gắn "mức chắc chắn cao".
- **Option B:** Evidence gồm dwell time, mouse activity, số lần quay lại, sidebar toggles, back clicks; uncertainty hiển thị theo tier (Tier 1: pill không evidence, Tier 2: card có confidence, Tier 3: card + evidence on demand).
- **Option C:** Evidence gồm phần công thức learner chọn và câu trả lời làm rõ; uncertainty chuyển thành trạng thái "Chờ bạn xác nhận".

#### 4. Control and Recovery

- **Option A:** chọn lại câu trả lời, bỏ qua result, đóng preview, reset option và reset toàn bộ.
- **Option B:** "Không đúng", chọn concept khác, ẩn/khôi phục gợi ý, tắt quan sát, tiếp tục không có AI và reset.
- **Option C:** sửa phần đã chọn, trả lời lại câu làm rõ, bỏ qua result và reset.
- Sau refresher, mọi option quay lại đúng Slide 04 và giữ nguyên tiến độ bài học.

### Human–AI Decision Table

| Human–AI decision | Option A | Option B | Option C |
|---|---|---|---|
| User/AI làm gì? | AI hỏi; user tự báo cáo; AI đề xuất | AI quan sát trong phiên; user duyệt hoặc sửa | User chọn phần chưa hiểu; AI hỏi làm rõ; user xác nhận |
| Act / Ask / Don't Act | Ask trước khi đề xuất | Suggest & wait | Don't act → Ask → wait |
| Capability/limit | Hiện trước checkpoint; chỉ dùng concept map Chương 3 | Hiện trước khi quan sát; dwell 5s + mouse + signals; không ghi âm/dùng dữ liệu ngoài màn hình | Hiện trước khi chọn; chỉ phân tích phần user chọn |
| Evidence/uncertainty | Trích chính lựa chọn của user; "mức chắc chắn cao" | Multi-signal confidence theo tier (pill → card → card + evidence) | Trích phần user chọn + câu làm rõ; "chờ bạn xác nhận" |
| Control/recovery | Chọn lại, bỏ qua, preview, reset | Sửa gợi ý, ẩn/khôi phục, tắt quan sát, reset | Chọn lại, trả lời lại, bỏ qua, reset |

**Feedback & data check:** Option B nói rõ quan sát chỉ áp dụng trong phiên hiện tại. Tắt toggle dừng dùng tín hiệu đọc; phản hồi "Không đúng" chỉ sửa đề xuất hiện tại, prototype không tuyên bố học cho phiên sau. Option C nói rõ AI chỉ phân tích phần user chọn và cần user xác nhận trước khi mở bài ôn.

**Tự kiểm GATE 3 — Human control**

- [x] Mỗi option nói rõ user và AI làm gì.
- [x] Agency phù hợp với hậu quả khi AI đoán sai.
- [x] Evidence và uncertainty xuất hiện tại thời điểm learner ra quyết định.
- [x] Mỗi option có ít nhất một đường sửa, từ chối hoặc phục hồi.

## Chặng 4 — Build ba Micro-Prototypes (GATE 4)

Mỗi option có ba trạng thái chuẩn:

```text
COMMON CONTEXT
      ↓
CRITICAL INTERACTION
      ↓
RESULT / USER DECISION
```

Các đường test chính:

- A: Bắt đầu checkpoint → chọn mô tả → xem evidence → chọn lại / preview / bỏ qua.
- B: Tiếp tục phiên → observer chip animate "Đang đọc X%" → hint tier 1 (pill) → expand → tier 2/3 → mở bài ôn / ẩn / tắt quan sát.
- C: Bấm FAB → chọn khái niệm → câu làm rõ → xác nhận → refresher → xong / chọn lại.

Truy cập trực tiếp:

- Option A: `http://127.0.0.1:4173/option-a/index.html`
- Option B: `http://127.0.0.1:4173/option-b/index.html`
- Option C: `http://127.0.0.1:4173/option-c/index.html`

**Prototype annotation:** Mỗi option có file `ANNOTATION.md` mô tả We expect the tester to, Watch for, Do not explain.

**Tự kiểm GATE 4 — Test-ready**

- [x] Người không build có thể tự mở và thao tác A/B/C.
- [x] Cả ba bắt đầu từ cùng context và outcome task.
- [x] Không cần facilitator narrate trigger ẩn hoặc nút giả lập.
- [x] Mỗi option có evidence, uncertainty và điểm user lấy lại control.
- [x] Có path quay lại slide sau khi mở refresher.

## Chặng 5 — Test protocol

**Relevant context:** "Gần đây bạn có từng đọc lại một công thức nhiều lần mà vẫn chưa biết mình đang thiếu kiến thức nền nào không?"

**Outcome task:** "Trong tình huống này, hãy dùng từng phương án để tìm đúng kiến thức cần ôn và quyết định bước tiếp theo."

**Observation focus:** first action · hesitation · evidence read/ignored · correction/recovery · option được chọn và trade-off.

Facilitator dùng cùng task cho A/B/C, không giải thích icon hoặc cơ chế. Khi tester hỏi cách hoạt động, hỏi lại: "Theo bạn, nó nên hoạt động như thế nào?"

## Chặng 6 — Test với ba người (GATE 5)

### Trách nhiệm và timeline

| Thời gian | Hoạt động |
|---|---|
| 0–2 phút | Make comfortable + hỏi relevant context ngắn |
| 2–14 phút | Tester tự dùng A/B/C, khoảng 4 phút mỗi option |
| 14–18 phút | So sánh option, lý do và trade-off |
| 18–20 phút | Hoàn thành Feedback Note cá nhân |

Mỗi thành viên test cả A/B/C với một tester khác nhóm. Ba tester là ba người khác nhau; dùng cùng outcome task và không hướng dẫn thao tác.

### Trạng thái GATE 5 — Chưa thể chốt trước test thật

Không điền giả ba Feedback Notes. Gate này chỉ đạt sau khi có ba tester khác nhóm và có observation hành vi. Dùng mẫu trong [test_verification.md](test_verification.md), sau đó chốt:

- một pattern hoặc khác biệt giữa ba tester;
- một Next Change dựa trên evidence;
- một điều Still Unproven.

"Ba tester thích B" không đủ nếu thiếu hành vi và trade-off đi kèm.
