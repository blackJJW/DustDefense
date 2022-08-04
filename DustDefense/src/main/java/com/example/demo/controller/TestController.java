package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

	// 게시글 작성 페이지
    @GetMapping("/post/main.do")
    public String openPostWrite(Model model) {
        return "main";
    }


}
