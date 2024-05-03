import React, { useState } from "react";
import $ from "jquery";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const strTime = `${hour}:${minute}`;

    const userHtml = `<div class="d-flex justify-content-end mb-4">
            <div class="msg_cotainer_send">${inputText}<span class="msg_time_send">${strTime}</span></div>
            <div class="img_cont_msg"><img src="https://i.ibb.co/d5b84Xw/Untitled-design.png" class="rounded-circle user_img_msg"></div>
        </div>`;
    setMessages([...messages, userHtml]);

    $.ajax({
      data: { msg: inputText },
      type: "POST",
      url: "/get",
    }).done((data: string) => {
      const botHtml = `<div class="d-flex justify-content-start mb-4">
                <div class="img_cont_msg"><img src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png" class="rounded-circle user_img_msg"></div>
                <div class="msg_cotainer">${data}<span class="msg_time">${strTime}</span></div>
            </div>`;
      setMessages([...messages, botHtml]);
    });

    setInputText("");
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-8 col-xl-6 chat h-100">
          <div className="card h-100">
            <div className="card-header msg_head">
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img src="apix.svg" className="rounded-circle user_img"></img>
                  <span className="online_icon"></span>
                </div>
                <div className="user_info">
                  <span>ApixBot</span>
                  <p className="h1">Preguntame!</p>
                </div>
              </div>
            </div>
            <div className="card-body msg_card_body">
              {messages.map((message, index) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: message }}
                ></div>
              ))}
            </div>
            <div className="card-footer">
              <form onSubmit={sendMessage} className="input-group">
                <input
                  type="text"
                  id="text"
                  name="msg"
                  placeholder="Type your message..."
                  autoComplete="off"
                  className="form-control type_msg"
                  required
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    id="send"
                    className="input-group-text send_btn"
                  >
                    <i className="fas fa-location-arrow"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
