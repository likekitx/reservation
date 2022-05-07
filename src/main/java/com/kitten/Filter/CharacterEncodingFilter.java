package com.kitten.Filter;
import jakarta.servlet.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
/**
 * @author ASUS
 */
@WebFilter(filterName = "CharacterEncodingFilter",value = "/*")
public class CharacterEncodingFilter implements Filter {
    @Override
    public void init(FilterConfig config) throws ServletException {}
    @Override
    public void destroy() {}
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        chain.doFilter(request, response);
    }
}
