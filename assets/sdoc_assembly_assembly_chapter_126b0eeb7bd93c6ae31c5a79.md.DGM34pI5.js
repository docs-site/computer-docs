import{_ as a,c as n,o as p,b0 as e}from"./chunks/framework.JcZxIv1X.js";const u=JSON.parse('{"title":"LV010-第10章-CALL和RET指令","description":null,"frontmatter":{"title":"LV010-第10章-CALL和RET指令","date":"2025-10-21T11:43:29.000Z","icon":"famicons:logo-markdown","permalink":"/sdoc/assembly/assembly/chapter/126b0eeb7bd93c6ae31c5a79","index":true,"tags":null,"categories":null,"copyright":false,"keywords":null,"cover":null,"comments":null,"mathjax":null,"top":null,"description":null,"tdoc":{"detailDate":"2025-10-21T11:43:29.966Z","fulluuid":"ae31c5a798284c96867f47cde9684b8c","useduuid":"ae31c5a79"}},"headers":[],"relativePath":"sdoc/assembly/assembly/chapter/126b0eeb7bd93c6ae31c5a79.md","filePath":"sdoc/01-Assembly/10-汇编语言/01-各个章节/LV010-第10章-CALL和RET指令.md","lastUpdated":1767424849000}'),l={name:"sdoc/assembly/assembly/chapter/126b0eeb7bd93c6ae31c5a79.md"};function i(r,s,t,c,b,d){return p(),n("div",null,[...s[0]||(s[0]=[e(`<h1 id="lv010-第10章-call和ret指令" tabindex="-1">LV010-第10章-CALL和RET指令 <a class="header-anchor" href="#lv010-第10章-call和ret指令" aria-label="Permalink to &quot;LV010-第10章-CALL和RET指令&quot;">​</a></h1><p>call 和 ret 指令都是转移指令，它们都修改 IP，或同时修改 CS 和 IP。它们经常被共同用来实现子程序的设计。这一章，我们讲解 call 和 ret 指令的原理。</p><h2 id="_10-1-ret-和-retf" tabindex="-1">10.1 ret 和 retf <a class="header-anchor" href="#_10-1-ret-和-retf" aria-label="Permalink to &quot;10.1 ret 和 retf&quot;">​</a></h2><p>ret 指令 <strong>用栈中的数据，修改 IP 的内容</strong>，从而实现 <strong>近转移</strong>；</p><p>retf 指令 <strong>用栈中的数据，修改 CS 和 IP 的内容</strong>，从而实现 <strong>远转移</strong>。</p><p>CPU 执行 ret 指令时，进行下面两步操作：</p><ul><li>(1) (IP)=((ss)*16+(sp))</li><li>(2) (sp)=(sp)+2</li></ul><p>CPU 执行 retf 指令时，进行下面 4 步操作：</p><ul><li>(1) (IP)=((ss)*16+(sp))</li><li>(2) (sp)=(sp)+2</li><li>(3) (CS)=((ss)*16+(sp))</li><li>(4) (sp)=(sp)+2</li></ul><p>可以看出，如果我们用汇编语法来解释 ret 和 retf 指令，则:</p><p>CPU 执行 ret 指令时，相当于进行:</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pop IP</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>CPU 执行 retf 指令时，相当于进行:</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pop IP</span></span>
<span class="line"><span>pop CS</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>例如下面的程序中，ret 指令执行后，(IP)= 0，CS: IP 指向代码段的第一条指令。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assume cs:code</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stack segment</span></span>
<span class="line"><span>    db 16 dup (0)</span></span>
<span class="line"><span>stack ends</span></span>
<span class="line"><span></span></span>
<span class="line"><span>code segment</span></span>
<span class="line"><span>    mov ax,4c00h</span></span>
<span class="line"><span>    int 21h  </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>start:</span></span>
<span class="line"><span>    mov ax,stack  </span></span>
<span class="line"><span>    mov ss,ax  </span></span>
<span class="line"><span>    mov sp,16  </span></span>
<span class="line"><span>    mov ax,0  </span></span>
<span class="line"><span>    push ax  </span></span>
<span class="line"><span>    mov bx,0  </span></span>
<span class="line"><span>    ret  </span></span>
<span class="line"><span>code ends  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>end start</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>下面的程序中，retf 指令执行后，CS: IP 指向代码段的第一条指令。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assume cs:code </span></span>
<span class="line"><span></span></span>
<span class="line"><span>stack segment  </span></span>
<span class="line"><span>    db 16 dup (0)  </span></span>
<span class="line"><span>stack ends  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>code segment  </span></span>
<span class="line"><span>    mov ax,4c00h  </span></span>
<span class="line"><span>    int 21h  </span></span>
<span class="line"><span>start:</span></span>
<span class="line"><span>    mov ax,stack  </span></span>
<span class="line"><span>    mov ss,ax  </span></span>
<span class="line"><span>    mov sp,16  </span></span>
<span class="line"><span>    mov ax,0  </span></span>
<span class="line"><span>    push cs  </span></span>
<span class="line"><span>    push ax  </span></span>
<span class="line"><span>    mov bx,0  </span></span>
<span class="line"><span>    retf  </span></span>
<span class="line"><span>code ends  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>end start</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="_10-a-检测点-10-1" tabindex="-1">10.a 检测点 10.1 <a class="header-anchor" href="#_10-a-检测点-10-1" aria-label="Permalink to &quot;10.a 检测点 10.1&quot;">​</a></h2><p>补全程序，实现从内存 1000:0000 处开始执行指令。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assume cs:code</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stack segment</span></span>
<span class="line"><span>    db 16 dup (0)</span></span>
<span class="line"><span>stack ends</span></span>
<span class="line"><span></span></span>
<span class="line"><span>code segment</span></span>
<span class="line"><span>start:</span></span>
<span class="line"><span>    mov ax, stack</span></span>
<span class="line"><span>    mov ss, ax</span></span>
<span class="line"><span>    mov sp, 16</span></span>
<span class="line"><span>    mov ax, ___________</span></span>
<span class="line"><span>    push ax</span></span>
<span class="line"><span>    mov ax, ___________</span></span>
<span class="line"><span>    push ax</span></span>
<span class="line"><span>    retf</span></span>
<span class="line"><span>code ends</span></span>
<span class="line"><span></span></span>
<span class="line"><span>end start</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>解析：</p><p>栈是 FILO 结构，因为 retf 是先 pop ip，后 pop cs，所以入栈时要先压入 cs 后压入 ip</p><p>那答案就很明显了：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> mov ax,1000H</span></span>
<span class="line"><span> ...</span></span>
<span class="line"><span> mov ax,0H</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_10-2-call-指令" tabindex="-1">10.2 call 指令 <a class="header-anchor" href="#_10-2-call-指令" aria-label="Permalink to &quot;10.2 call 指令&quot;">​</a></h2><p>CPU 执行 call 指令时，进行两步操作：</p><p>（1）将当前的 IP 或 CS 和 IP 压入栈中；</p><p>（2）转移。</p><p>call 指令不能实现短转移，除此之外，call 指令实现转移的方法和 jmp 指令的原理相同，下面的几个小节中，我们以给出转移目的地址的不同方法为主线，讲解 call 指令的主要应用格式。</p><h2 id="_10-3-依据位移进行转移的-call-指令" tabindex="-1">10.3 依据位移进行转移的 call 指令 <a class="header-anchor" href="#_10-3-依据位移进行转移的-call-指令" aria-label="Permalink to &quot;10.3 依据位移进行转移的 call 指令&quot;">​</a></h2><p>call 标号(将当前的 IP 压栈后，转到标号处执行指令)</p><p>CPU 执行此种格式的 call 指令时，进行如下的操作:</p><p>（1）</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(sp)=(sp)-2</span></span>
<span class="line"><span>((ss)*16+(sp))=(IP)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>（2）</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(IP)=(IP)+16 位位移</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>16 位位移 = 标号处的地址-call 指令后的第一个字节的地址；</li><li>16 位位移的范围为-32768~32767，用补码表示；</li><li>16 位位移由编译程序在编译时算出。</li></ul><p>从上面的描述中，可以看出，如果我们用汇编语法来解释此种格式的 call 指令，则：</p><p>CPU 执行“call 标号”时，相当于进行：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>push IP</span></span>
<span class="line"><span>jmp near ptr 标号</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="_10-b-检测点-10-2" tabindex="-1">10.b 检测点 10.2 <a class="header-anchor" href="#_10-b-检测点-10-2" aria-label="Permalink to &quot;10.b 检测点 10.2&quot;">​</a></h2><p>下面的程序执行后，ax 中的数值为多少？</p><table tabindex="0"><thead><tr><th>内存地址</th><th>机器码</th><th>汇编指令</th></tr></thead><tbody><tr><td>1000:0</td><td>b8 00 00</td><td>mov ax,0</td></tr><tr><td>1000:3</td><td>e8 01 00</td><td>call s</td></tr><tr><td>1000:6</td><td>40</td><td>inc ax</td></tr><tr><td>1000:7</td><td>58</td><td>s: pop ax</td></tr></tbody></table><p>解析：</p><table tabindex="0"><thead><tr><th>内存地址</th><th>机器码</th><th>汇编指令</th><th>作用</th></tr></thead><tbody><tr><td>1000:0</td><td>b8 00 00</td><td>mov ax,0</td><td>ax = 0</td></tr><tr><td>1000:3</td><td>e8 01 00</td><td>call s</td><td>ip = 6, push ip, jmp near s</td></tr><tr><td>1000:6</td><td>40</td><td>inc ax</td><td>不执行</td></tr><tr><td>1000:7</td><td>58</td><td>s: pop ax</td><td>ax = 6</td></tr></tbody></table><h2 id="_10-4-转移的目的地址在指令中的-call-指令" tabindex="-1">10.4 转移的目的地址在指令中的 call 指令 <a class="header-anchor" href="#_10-4-转移的目的地址在指令中的-call-指令" aria-label="Permalink to &quot;10.4 转移的目的地址在指令中的 call 指令&quot;">​</a></h2><p>前面讲的 call 指令，其对应的机器指令中并没有转移的目的地址，而是相对于当前 IP 的转移位移。</p><p>“call far ptr 标号”实现的是 <strong>段间转移</strong>。</p><p>CPU 执行此种格式的 call 指令时，进行如下的操作。</p><p>（1）</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(sp)=(sp)-2</span></span>
<span class="line"><span>((ss)*16+(sp))=(CS)</span></span>
<span class="line"><span>(sp)=(sp)-2</span></span>
<span class="line"><span>((ss)*16+(sp))=(IP)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>（2）</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(CS)= 标号所在段的段地址</span></span>
<span class="line"><span>(IP)= 标号在段中的偏移地址</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>从上面的描述中可以看出，如果我们用汇编语法来解释此格式的 call 指令，则：</p><p>CPU 执行 “call far ptr 标号” 时，相当于进行：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>push CS  </span></span>
<span class="line"><span>push IP  </span></span>
<span class="line"><span>jmp far ptr 标号</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_10-c-检测点-10-3" tabindex="-1">10.c 检测点 10.3 <a class="header-anchor" href="#_10-c-检测点-10-3" aria-label="Permalink to &quot;10.c 检测点 10.3&quot;">​</a></h2><p>下面的程序执行后，ax 中的数值为多少？</p><table tabindex="0"><thead><tr><th>内存地址</th><th>机器码</th><th>汇编指令</th></tr></thead><tbody><tr><td>1000:0</td><td>b8 00 00</td><td>mov ax, 0</td></tr><tr><td>1000:3</td><td>9A 09 00 00 10</td><td>call far ptr s</td></tr><tr><td>1000:8</td><td>40</td><td>inc ax</td></tr><tr><td>1000:9</td><td>58</td><td>s: pop ax</td></tr><tr><td></td><td></td><td>add ax, ax</td></tr><tr><td></td><td></td><td>pop bx</td></tr><tr><td></td><td></td><td>add ax, bx</td></tr></tbody></table><p>解析：</p><table tabindex="0"><thead><tr><th>内存地址</th><th>机器码</th><th>汇编指令</th><th>作用</th></tr></thead><tbody><tr><td>1000:0</td><td>b8 00 00</td><td>mov ax, 0</td><td>ax = 0</td></tr><tr><td>1000:3</td><td>9A 09 00 00 10</td><td>call far ptr s</td><td>push cs(1000)、push ip(8), jmp s</td></tr><tr><td>1000:8</td><td>40</td><td>inc ax</td><td>不执行</td></tr><tr><td>1000:9</td><td>58</td><td>s: pop ax</td><td>ax = ip = 8 = 0008H</td></tr><tr><td></td><td></td><td>add ax, ax</td><td>ax = 16 = 0010H</td></tr><tr><td></td><td></td><td>pop bx</td><td>bx = 1000H</td></tr><tr><td></td><td></td><td>add ax, bx</td><td>ax = 1010H</td></tr></tbody></table><h2 id="_10-5-转移地址在寄存器中的-call-指令" tabindex="-1">10.5 转移地址在寄存器中的 call 指令 <a class="header-anchor" href="#_10-5-转移地址在寄存器中的-call-指令" aria-label="Permalink to &quot;10.5 转移地址在寄存器中的 call 指令&quot;">​</a></h2><p><strong>指令格式</strong>：<code>call 16-bit-reg</code><strong>功能</strong>：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(sp)=(sp)-2</span></span>
<span class="line"><span>((ss)*16+(sp))=(IP)</span></span>
<span class="line"><span>(IP)=(16-bit-reg)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>用汇编语法来解释此种格式的 call 指令，CPU 执行“call 16-bit-reg”时，相当于进行：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>push IP</span></span>
<span class="line"><span>jmp 16-bit-reg</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="_10-d-检测点-10-4" tabindex="-1">10.d 检测点 10.4 <a class="header-anchor" href="#_10-d-检测点-10-4" aria-label="Permalink to &quot;10.d 检测点 10.4&quot;">​</a></h2><p>下面的程序执行后，ax 中的数值为多少？</p><table tabindex="0"><thead><tr><th>内存地址</th><th>机器码</th><th>汇编指令</th></tr></thead><tbody><tr><td>1000:0</td><td>b8 06 00</td><td>mov ax,6</td></tr><tr><td>1000:3</td><td>ff d0</td><td>call ax</td></tr><tr><td>1000:5</td><td>40</td><td>inc ax</td></tr><tr><td>1000:6</td><td></td><td>mov bp, sp</td></tr><tr><td></td><td></td><td>add ax, [bp]</td></tr></tbody></table><p>解析：</p><table tabindex="0"><thead><tr><th>内存地址</th><th>机器码</th><th>汇编指令</th><th>作用</th></tr></thead><tbody><tr><td>1000:0</td><td>b8 06 00</td><td>mov ax,6</td><td>ax = 6</td></tr><tr><td>1000:3</td><td>ff d0</td><td>call ax</td><td>ip = 5, push ip, jmp 6</td></tr><tr><td>1000:5</td><td>40</td><td>inc ax</td><td>不执行</td></tr><tr><td>1000:6</td><td></td><td>mov bp, sp</td><td>bp = sp</td></tr><tr><td></td><td></td><td>add ax, [bp]</td><td>ax = ax + ss: [bp] = 6 + 5 = 11 = 0BH</td></tr></tbody></table><h2 id="_10-6-转移地址在内存中的-call-指令" tabindex="-1">10.6 转移地址在内存中的 call 指令 <a class="header-anchor" href="#_10-6-转移地址在内存中的-call-指令" aria-label="Permalink to &quot;10.6 转移地址在内存中的 call 指令&quot;">​</a></h2><p>转移地址在内存中的 call 指令有两种格式。</p><p>(1) call word ptr 内存单元地址</p><p>用汇编语法来解释此种格式的 call 指令，则：</p><p>CPU 执行 “call word ptr 内存单元地址” 时，相当于进行：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>push IP</span></span>
<span class="line"><span>jmp word ptr 内存单元地址</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>比如，下面的指令：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mov sp,10h</span></span>
<span class="line"><span>mov ax,0123h</span></span>
<span class="line"><span>mov ds:[0],ax</span></span>
<span class="line"><span>call word ptr ds:[0]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>执行后，(IP)= 0123H，(sp)= 0EH。</p><p>(2) call dword ptr 内存单元地址</p><p>用汇编语法来解释此种格式的 call 指令，则：</p><p>CPU 执行“call dword ptr 内存单元地址”时，相当于进行：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>push CS</span></span>
<span class="line"><span>push IP</span></span>
<span class="line"><span>jmp dword ptr 内存单元地址</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>比如，下面的指令：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mov sp,10h</span></span>
<span class="line"><span>mov ax,0123h</span></span>
<span class="line"><span>mov ds:[0],ax</span></span>
<span class="line"><span>mov word ptr ds:[2],0</span></span>
<span class="line"><span>call dword ptr ds:[0]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>执行后，(CS)= 0，(IP)= 0123H，(sp)= 0CH。</p><h2 id="_10-e-检测点-10-5" tabindex="-1">10.e 检测点 10.5 <a class="header-anchor" href="#_10-e-检测点-10-5" aria-label="Permalink to &quot;10.e 检测点 10.5&quot;">​</a></h2><p>(1) 下面的程序执行后，ax 中的数值为多少？(注意：用 call 指令的原理来分析，不要在 Debug 中单步跟踪来验证你的结论。对于此程序，在 Debug 中单步跟踪的结果，不能代表 CPU 的实际执行结果。)</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assume cs:code</span></span>
<span class="line"><span>stack segment</span></span>
<span class="line"><span>    dw 8 dup (0)</span></span>
<span class="line"><span>stack ends</span></span>
<span class="line"><span>code segment</span></span>
<span class="line"><span>start:</span></span>
<span class="line"><span>    mov ax, stack</span></span>
<span class="line"><span>    mov ss, ax</span></span>
<span class="line"><span>    mov sp, 16</span></span>
<span class="line"><span>    mov ds, ax</span></span>
<span class="line"><span>    mov ax, 0</span></span>
<span class="line"><span>    call word ptr ds:[0EH]</span></span>
<span class="line"><span>    inc ax</span></span>
<span class="line"><span>    inc ax</span></span>
<span class="line"><span>    inc ax</span></span>
<span class="line"><span>    mov ax, 4C00H</span></span>
<span class="line"><span>    int 21h</span></span>
<span class="line"><span>code ends</span></span>
<span class="line"><span>end start</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>解析：</p><ul><li>栈段和数据段都设置成同一段</li><li>执行 <code>call word ptr ds:[0EH]</code> 后 IP 入栈，入栈存在 ds:[0E] 和 ds:[0F] 中</li><li>ax 的最终值为 3，分析如下：</li></ul><table tabindex="0"><thead><tr><th>指令</th><th>作用</th></tr></thead><tbody><tr><td>mov ax, stack</td><td>ax = stack</td></tr><tr><td>mov ss, ax</td><td>ss = stack</td></tr><tr><td>mov sp, 16</td><td>sp = 16 = 10H</td></tr><tr><td>mov ds, ax</td><td>ds = ax = stack</td></tr><tr><td>mov ax, 0</td><td>ax = 0</td></tr><tr><td>call word ptr ds: [0EH]</td><td>Push IP，SP = 0EH，jmp ds: [0EH] = jmp IP</td></tr><tr><td>inc ax</td><td>ax = 1</td></tr><tr><td>inc ax</td><td>ax = 2</td></tr><tr><td>inc ax</td><td>ax = 3</td></tr><tr><td>mov ax, 4C00H</td><td>程序终止</td></tr></tbody></table><p>(2) 下面的程序执行后，ax 和 bx 中的数值为多少？</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assume cs:code</span></span>
<span class="line"><span>data segment</span></span>
<span class="line"><span>    dw 8 dup (0)</span></span>
<span class="line"><span>data ends</span></span>
<span class="line"><span>code segment</span></span>
<span class="line"><span>start:</span></span>
<span class="line"><span>    mov ax, data</span></span>
<span class="line"><span>    mov ss, ax</span></span>
<span class="line"><span>    mov sp, 16</span></span>
<span class="line"><span>    mov word ptr ss:[0], offset s</span></span>
<span class="line"><span>    mov ss:[2], cs</span></span>
<span class="line"><span>    call dword ptr ss:[0]</span></span>
<span class="line"><span>    nop</span></span>
<span class="line"><span>s: </span></span>
<span class="line"><span>    mov ax,offset s</span></span>
<span class="line"><span>    sub ax,ss:[0CH]</span></span>
<span class="line"><span>    mov bx,cs</span></span>
<span class="line"><span>    sub bx,ss:[0EH]</span></span>
<span class="line"><span>    mov ax,4C00h</span></span>
<span class="line"><span>    int 21h</span></span>
<span class="line"><span>code ends</span></span>
<span class="line"><span>end start</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>分析：</p><ul><li>同样数据段和栈段设置在同一段</li></ul><table tabindex="0"><thead><tr><th>指令</th><th>作用</th></tr></thead><tbody><tr><td>mov ax, data</td><td>ax = data</td></tr><tr><td>mov ss, ax</td><td>ss = data</td></tr><tr><td>mov sp, 16</td><td>sp = 10H</td></tr><tr><td>mov word ptr ss: [0], offset s</td><td>ss: [0] = s(s 偏移地址存放在 ss: [0] 和 ss: [1] 中)</td></tr><tr><td>mov ss: [2], cs</td><td>ss: [2] = cs(cs 存放在 ss: [2] 和 ss: [3] 中)</td></tr><tr><td>call dword ptr ss: [0]</td><td>push CS, push IP(IP 指向 nop), sp = 0CH, jmp cs: s</td></tr><tr><td>nop</td><td>不执行</td></tr><tr><td>s: mov ax, offset s</td><td>ax = s</td></tr><tr><td>sub ax, ss: [0CH]</td><td>ax = s - ss: [0CH] = s - IP = 1(nop 占 1 个字节)</td></tr><tr><td>mov bx, cs</td><td>bx = cs</td></tr><tr><td>sub bx, ss: [0EH]</td><td>bx = cs - ss: [0EH] = cs - cs = 0</td></tr><tr><td>mov ax,4C00h</td><td>程序终止</td></tr><tr><td>int 21h</td><td>程序终止</td></tr></tbody></table><h2 id="_10-7-call-和-ret-的配合使用" tabindex="-1">10.7 call 和 ret 的配合使用 <a class="header-anchor" href="#_10-7-call-和-ret-的配合使用" aria-label="Permalink to &quot;10.7 call 和 ret 的配合使用&quot;">​</a></h2><p>前面分别学习了 ret 和 call 指令的原理。现在来看一下，如何将它们配合使用来实现子程序的机制。</p><h4 id="问题-10-1" tabindex="-1">问题 10.1 <a class="header-anchor" href="#问题-10-1" aria-label="Permalink to &quot;问题 10.1&quot;">​</a></h4><p>下面程序返回前，bx 中的值是多少？</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assume cs:code</span></span>
<span class="line"><span>code segment</span></span>
<span class="line"><span>start: </span></span>
<span class="line"><span>    mov ax,1</span></span>
<span class="line"><span>    mov cx,3</span></span>
<span class="line"><span>    call s</span></span>
<span class="line"><span>    mov bx,ax         ;(bx)=?</span></span>
<span class="line"><span>    mov ax,4c00h</span></span>
<span class="line"><span>    int 21h</span></span>
<span class="line"><span>s:     </span></span>
<span class="line"><span>    add ax,ax</span></span>
<span class="line"><span>    loop s</span></span>
<span class="line"><span>    ret</span></span>
<span class="line"><span>code ends</span></span>
<span class="line"><span>end start</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>分析</strong>：</p><p>我们来看一下 CPU 执行这个程序的主要过程。</p><p>(1) CPU 将 call s 指令的机器码读入，IP 指向了 call s 后的指令 mov bx, ax，然后 CPU 执行 call s 指令，将当前的 IP 值(指令 mov bx, ax 的偏移地址)压栈，并将 IP 的值改变为标号 s 处的偏移地址;</p><p>(2) CPU 从标号 s 处开始执行指令，loop 循环完毕后，(ax)= 8;</p><p>(3) CPU 将 ret 指令的机器码读入，IP 指向了 ret 指令的内存单元，然后 CPU 执行 ret 指令，从栈中弹出一个值(即 call s 先前压入的 mov bx, ax 指令的偏移地址)送入 IP 中。则 CS: IP 指向指令 mov bx, ax;</p><p>(4) CPU 从 mov bx, ax 开始执行指令，直至完成。</p><p>程序返回前，(bx)= 8。可以看出，从标号 s 到 ret 的程序段的作用是计算 2 的 N 次方，计算前，N 的值由 cx 提供。</p><p>我们再来看看下面的程序：</p><p>源程序</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>;源程序                     ;内存中的情况(假设程序从内存 1000:0 处装入)</span></span>
<span class="line"><span>assume cs:code</span></span>
<span class="line"><span>stack segment</span></span>
<span class="line"><span>    db 8 dup (0)              ;1000:0000 00 00 00 00 00 00 00</span></span>
<span class="line"><span>    db 8 dup (0)              ;1000:0008 00 00 00 00 00 00 00</span></span>
<span class="line"><span>stack ends</span></span>
<span class="line"><span></span></span>
<span class="line"><span>code segment</span></span>
<span class="line"><span>start: </span></span>
<span class="line"><span>    mov ax, stack             ;1001:0000 B8 00 10</span></span>
<span class="line"><span>    mov ss, ax                ;1001:0003 8E D0</span></span>
<span class="line"><span>    mov sp,16                 ;1001:0005 BC 10 00</span></span>
<span class="line"><span>    mov ax,1000               ;1001:0008 B8 E8 03</span></span>
<span class="line"><span>    call s                    ;1001:000B E8 05 00</span></span>
<span class="line"><span>    mov ax,4c00h              ;1001:000E B8 00 4C</span></span>
<span class="line"><span>    int 21h                   ;1001:0011 CD 21</span></span>
<span class="line"><span>s:</span></span>
<span class="line"><span>    add ax,ax                 ;1001:0013 03 C0</span></span>
<span class="line"><span>    ret                       ;1001:0015 C3</span></span>
<span class="line"><span>code ends</span></span>
<span class="line"><span>end start</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>看一下程序的主要执行过程。 (1) 前 3 条指令执行后，栈的情况如下:</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1000:0000 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00</span></span>
<span class="line"><span>                                                          ↑ss: sp</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>(2) call 指令读入后，(IP)= 000EH，CPU 指令缓冲器中的代码为: E8 05 00;</p><p>CPU 执行 E8 05 00，首先，栈中的情况变为：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1000:0000 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0E 00</span></span>
<span class="line"><span>                                                       ↑ ss: sp</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>然后，(IP)=(IP)+0005 = 0013H。</p><p>(3) CPU 从 cs: 0013H 处（即标号 s 处）开始执行。</p><p>(4) ret 指令读入后：</p><p>(IP)= 0016H，CPU 指令缓冲器中的代码为：C3</p><p>CPU 执行 C3，相当于进行 pop IP，执行后，栈中的情况为：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1000:0000 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0E 00</span></span>
<span class="line"><span>                                                            ↑ ss: sp</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>(IP)= 000EH</p><p>(5) CPU 回到 cs: 000EH 处（即 call 指令后面的指令处）继续执行。</p><p>从上面的讨论中我们发现，可以写一个具有一定功能的程序段，我们称其为 <strong>子程序</strong>，在需要的时候，用 call 指令转去执行。可是执行完子程序后，如何让 CPU 接着 call 指令向下执行？call 指令转去执行子程序之前，call 指令后面的指令地址将存储在栈中，所以可在子程序的后面使用 ret 指令，用栈中的数据设置 IP 的值，从而转到 call 指令后面的代码处继续执行。</p><p>这样，我们可以利用 call 和 ret 来实现子程序的机制。子程序的框架如下。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>标号:</span></span>
<span class="line"><span>    指令</span></span>
<span class="line"><span>    ret</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>具有子程序的源程序的框架如下。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assume cs:code</span></span>
<span class="line"><span>code segment</span></span>
<span class="line"><span>main:</span></span>
<span class="line"><span>    ... ...</span></span>
<span class="line"><span>    call sub1       ;调用子程序 sub1</span></span>
<span class="line"><span>    ... ...</span></span>
<span class="line"><span>    ... ...</span></span>
<span class="line"><span>    mov ax,4c00h</span></span>
<span class="line"><span>    int 21h</span></span>
<span class="line"><span>sub1:               ;子程序 sub1 开始</span></span>
<span class="line"><span>    ... ...</span></span>
<span class="line"><span>    call sub2       ;调用子程序 sub2</span></span>
<span class="line"><span>    ... ...</span></span>
<span class="line"><span>    ... ...</span></span>
<span class="line"><span>    ret             ;子程序返回  </span></span>
<span class="line"><span>sub2:               ;子程序 sub2 开始  </span></span>
<span class="line"><span>    ...  </span></span>
<span class="line"><span>    ret             ;子程序返回  </span></span>
<span class="line"><span>code ends  </span></span>
<span class="line"><span>end main</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>现在，可以从子程序的角度，回过头来再看一下本节中的两个程序。</p><h2 id="_10-8-mul-指令" tabindex="-1">10.8 mul 指令 <a class="header-anchor" href="#_10-8-mul-指令" aria-label="Permalink to &quot;10.8 mul 指令&quot;">​</a></h2><p>因下面要用到，这里介绍一下 mul 指令，mul 是乘法指令，使用 mul 做乘法的时候，注意以下两点。</p><p>(1) 两个相乘的数：两个相乘的数，要么都是 8 位，要么都是 16 位。如果是 8 位，一个默认放在 AL 中，另一个放在 8 位 reg 或内存字节单元中；如果是 16 位，一个默认在 AX 中，另一个放在 16 位 reg 或内存字单元中。</p><p>(2) 结果：如果是 8 位乘法，结果默认放在 AX 中；如果是 16 位乘法，结果高位默认在 DX 中存放，低位在 AX 中放。</p><p>格式如下：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mul reg  </span></span>
<span class="line"><span>mul 内存单元</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>内存单元可以用不同的寻址方式给出，比如：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mul byte ptr ds:[0]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>含义：(ax)=(al)*((ds)*16+0))</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mul word ptr [bx+si+8]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>含义：</p><p>(ax)=(ax)*((ds)*16+(bx)+(si)+8) 结果的低 16 位</p><p>(dx)=(ax)*((ds)*16+(bx)+(si)+8) 结果的高 16 位。</p><p>例：</p><p>(1) 计算 100*10。</p><p>100 和 10 小于 255，可以做 8 位乘法，程序如下。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mov al,100  </span></span>
<span class="line"><span>mov bl,10  </span></span>
<span class="line"><span>mul bl</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>结果：(ax)= 1000(03E8H)</p><p>(2) 计算 100 * 10000</p><p>100 小于 255，可 10000 大于 255，所以必须做 16 位乘法，程序如下。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mov ax,100</span></span>
<span class="line"><span>mov bx,10000</span></span>
<span class="line"><span>mul bx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>结果：(ax)= 4240H，(dx)= 000FH (F4240H = 1000000)</p><h2 id="_10-9-模块化程序设计" tabindex="-1">10.9 模块化程序设计 <a class="header-anchor" href="#_10-9-模块化程序设计" aria-label="Permalink to &quot;10.9 模块化程序设计&quot;">​</a></h2><p>从上面我们看到，call 与 ret 指令共同支持了汇编语言编程中的模块化设计。在实际编程中，<strong>程序的模块化</strong> 是必不可少的。因为现实的问题比较复杂，对现实问题进行分析时，把它 <strong>转化成为相互联系、不同层次的子问题</strong>，是必须的解决方法。而 call 与 ret 指令对这种分析方法提供了程序实现上的支持。利用 call 和 ret 指令，我们可以用简捷的方法，实现多个相互联系、功能独立的子程序来解决一个复杂的问题。</p><p>下面的内容中，我们来看一下子程序设计中的相关问题和解决方法。</p><h2 id="_10-10-参数和结果传递的问题" tabindex="-1">10.10 参数和结果传递的问题 <a class="header-anchor" href="#_10-10-参数和结果传递的问题" aria-label="Permalink to &quot;10.10 参数和结果传递的问题&quot;">​</a></h2><p>子程序一般都要根据提供的参数处理一定的事务，处理后，将结果(返回值)提供给调用者。其实，我们讨论参数和返回值传递的问题，实际上就是在探讨，应该 <strong>如何存储子程序需要的参数和产生的返回值</strong>。</p><p>比如，设计一个子程序，可以根据提供的 N，来计算 N 的 3 次方。</p><p>这里面就有两个问题：</p><p>（1）将参数 N 存储在什么地方？</p><p>（2）计算得到的数值，存储在什么地方？</p><p>很显然，可以用寄存器来存储，可以将参数放到 bx 中；因为子程序中要计算 <code>N*N*N</code>，可以使用多个 mul 指令，为了方便，可将结果放到 dx 和 ax 中。子程序如下。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>; 说明: 计算 N 的 3 次方</span></span>
<span class="line"><span>; 参数: (bx) = N</span></span>
<span class="line"><span>; 结果: (dx:ax) = N^3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cube:</span></span>
<span class="line"><span>    mov ax,bx</span></span>
<span class="line"><span>    mul bx</span></span>
<span class="line"><span>    mul bx</span></span>
<span class="line"><span>    ret</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>注意，我们在编程的时候要注意形成良好的风格，对于 <strong>程序应有详细的注释</strong>。<strong>子程序注释信息</strong> 应该包含对 <strong>子程序的功能、参数和结果</strong> 的说明。因为今天写的子程序，以后可能还会用到；自己写的子程序，也很可能要给别人使用，所以一定要有全面的说明。</p><p>用寄存器来存储参数和结果是常用方法。对于存放参数的寄存器和存放结果的寄存器，调用者和子程序的读写操作恰恰相反：调用者将参数送入参数寄存器，从结果寄存器中取到返回值；子程序从参数寄存器中取到参数，将返回值送入结果寄存器。</p><p>【编程】计算 data 段中第一组数据的 3 次方，结果保存在后面一组 dword 单元中。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assume cs:code</span></span>
<span class="line"><span>data segment</span></span>
<span class="line"><span>    dw 1,2,3,4,5,6,7,8</span></span>
<span class="line"><span>    dd 0,0,0,0,0,0,0,0</span></span>
<span class="line"><span>data ends</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;我们可以用到已经写好的子程序，程序如下：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>code segment</span></span>
<span class="line"><span>start:</span></span>
<span class="line"><span>    mov ax,data</span></span>
<span class="line"><span>    mov ds,ax</span></span>
<span class="line"><span>    mov si,0        ;ds:si 指向第一组 word 单元</span></span>
<span class="line"><span>    mov di,16       ;ds:di 指向第二组 dword 单元</span></span>
<span class="line"><span>    mov cx,8</span></span>
<span class="line"><span>s:</span></span>
<span class="line"><span>    mov bx,[si]</span></span>
<span class="line"><span>    call cube</span></span>
<span class="line"><span>    mov [di],ax</span></span>
<span class="line"><span>    mov [di+2],dx</span></span>
<span class="line"><span>    add si,2        ;ds:si 指向下一个 word 单元</span></span>
<span class="line"><span>    add di,4        ;ds:di 指向下一个 dword 单元</span></span>
<span class="line"><span>    loop s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    mov ax,4c00h</span></span>
<span class="line"><span>    int 21h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cube:</span></span>
<span class="line"><span>    mov ax,bx</span></span>
<span class="line"><span>    mul bx</span></span>
<span class="line"><span>    mul bx</span></span>
<span class="line"><span>    ret</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>code ends</span></span>
<span class="line"><span>end start</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h2 id="_10-11-批量数据的传递" tabindex="-1">10.11 批量数据的传递 <a class="header-anchor" href="#_10-11-批量数据的传递" aria-label="Permalink to &quot;10.11 批量数据的传递&quot;">​</a></h2><p>前面的例程中，子程序 cube 只有一个参数，放在 bx 中。可是如果需要传递的数据有 3 个、4 个或更多直至 N 个，该怎样存放呢？寄存器的数量终究有限，我们不可能简单地用寄存器来存放多个需要传递的数据。对于返回值，也有同样的问题。</p><p>在这种情况下，我们将批量数据放到内存中，然后将它们所在内存空间的首地址放在寄存器中，传递给需要的子程序。对于具有批量数据的返回结果，也可用同样的方法。</p><p>【典例】设计一个子程序，功能：将一个全是字母的字符串转化为大写。</p><p>这个子程序需要知道两件事，字符串的内容和字符串的长度。因为字符串中的字母可能很多，所以不便将整个字符串中的所有字母都直接传递给子程序。但是，可以将 <strong>字符串在内存中的首地址</strong> 放在寄存器中传递给子程序。因为子程序要用到循环，我们可以用 loop 指令，而循环的次数恰恰就是字符串的长度。出于方便的考虑，可以将字符串的长度放到 cx 中。</p><p>子程序：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>capital: </span></span>
<span class="line"><span>    and byte ptr [si],11011111b     ;将 ds:si 所指单元中的字母转化为大写 </span></span>
<span class="line"><span>    inc si                          ;ds:si 指向下一个单元</span></span>
<span class="line"><span>    loop capital</span></span>
<span class="line"><span>    ret</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>将 data 段中的字符串转化为大写：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assume cs:code</span></span>
<span class="line"><span></span></span>
<span class="line"><span>data segment</span></span>
<span class="line"><span>    db &#39;conversation&#39;</span></span>
<span class="line"><span>data ends</span></span>
<span class="line"><span></span></span>
<span class="line"><span>code segment</span></span>
<span class="line"><span>start:</span></span>
<span class="line"><span>    mov ax,data</span></span>
<span class="line"><span>    mov ds,ax</span></span>
<span class="line"><span>    mov si,0        ;ds:si 指向字符串(批量数据)所在空间的首地址</span></span>
<span class="line"><span>    mov cx,12       ;cx 存放字符串的长度</span></span>
<span class="line"><span>    call capital</span></span>
<span class="line"><span>    mov ax,4c00h</span></span>
<span class="line"><span>    int 21h</span></span>
<span class="line"><span>capital:</span></span>
<span class="line"><span>    and byte ptr [si],11011111b</span></span>
<span class="line"><span>    inc si</span></span>
<span class="line"><span>    loop capital</span></span>
<span class="line"><span>    ret</span></span>
<span class="line"><span>code ends</span></span>
<span class="line"><span>end start</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>注意，除了用了寄存器传递参数外，还有一种通用的方法是 <strong>用栈来传递参数</strong>。关于这种技术请参看附注 4。</p><h2 id="_10-12-寄存器冲突的问题" tabindex="-1">10.12 寄存器冲突的问题 <a class="header-anchor" href="#_10-12-寄存器冲突的问题" aria-label="Permalink to &quot;10.12 寄存器冲突的问题&quot;">​</a></h2><p>【编程】设计一个子程序，功能：将一个全是字母，以 0 结尾的字符串，转化为大写。</p><p>程序要处理的字符串以 0 作为结尾符，这个字符串可以如下定义：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>db &#39;conversation&#39;,0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>应用这个子程序，字符串的内容后面一定要有一个 0，标记字符串的结束。子程序可以依次读取每个字符进行检测，如果不是 0，就进行大写的转化；如果是 0，就结束处理。由于可通过检测 0 知道是否已经处理完整个字符串，所以子程序可以不需要字符串的长度作为参数。可以用 jcxz 来检测 0。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>;说明：将一个全是字母，以 0 结尾的字符串，转化为大写</span></span>
<span class="line"><span>;参数：ds:si 指向字符串的首地址</span></span>
<span class="line"><span>;结果：没有返回值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>capital:</span></span>
<span class="line"><span>    mov cl,[si]</span></span>
<span class="line"><span>    jcxz ok</span></span>
<span class="line"><span>    and byte ptr [si],11011111b ;将 ds:si 所指单元中的字母转化为大写</span></span>
<span class="line"><span>    inc si</span></span>
<span class="line"><span>    jmp short capital</span></span>
<span class="line"><span>ok: </span></span>
<span class="line"><span>    ret</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>来看一下这个子程序的应用。</p><p>(1) 将 data 段中字符串转化为大写。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assume cs:code</span></span>
<span class="line"><span>data segment</span></span>
<span class="line"><span>    db &#39;conversation&#39;, 0</span></span>
<span class="line"><span>data ends</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>代码段中的相关程序段如下。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mov ax,data</span></span>
<span class="line"><span>mov ds,ax</span></span>
<span class="line"><span>mov si,0</span></span>
<span class="line"><span>call capital</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>(2) 将 data 段中的字符串全部转化为大写。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assume cs:code</span></span>
<span class="line"><span>data segment</span></span>
<span class="line"><span>    db &#39;word&#39;, 0</span></span>
<span class="line"><span>    db &#39;unix&#39;, 0</span></span>
<span class="line"><span>    db &#39;wind&#39;, 0</span></span>
<span class="line"><span>    db &#39;good&#39;, 0</span></span>
<span class="line"><span>data ends</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>可以看到，所有字符串的长度都是 5(算上结尾符 0)，使用循环，重复调用子程序 capital，完成对 4 个字符串的处理。完整的程序如下。</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>code segment</span></span>
<span class="line"><span>start: </span></span>
<span class="line"><span>    mov ax,data</span></span>
<span class="line"><span>    mov ds,ax</span></span>
<span class="line"><span>    mov bx,0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    mov cx,4</span></span>
<span class="line"><span>s: </span></span>
<span class="line"><span>    mov si,bx</span></span>
<span class="line"><span>    call capital</span></span>
<span class="line"><span>    add bx,5</span></span>
<span class="line"><span>    loop s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    mov ax,4c00h</span></span>
<span class="line"><span>    int 21h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>capital: </span></span>
<span class="line"><span>    mov cl,[si]</span></span>
<span class="line"><span>    mov ch,0</span></span>
<span class="line"><span>    jcxz ok</span></span>
<span class="line"><span>    and byte ptr [si],11011111b</span></span>
<span class="line"><span>    inc si</span></span>
<span class="line"><span>    jmp short capital</span></span>
<span class="line"><span>ok: </span></span>
<span class="line"><span>    ret</span></span>
<span class="line"><span></span></span>
<span class="line"><span>code ends</span></span>
<span class="line"><span></span></span>
<span class="line"><span>end start</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h4 id="问题-10-2" tabindex="-1">问题 10.2 <a class="header-anchor" href="#问题-10-2" aria-label="Permalink to &quot;问题 10.2&quot;">​</a></h4><p>这个程序在思想上完全正确，但在细节上却有些错误。</p><p><strong>分析：</strong></p><p>问题在于 cx 的使用，主程序要使用 cx 记录循环次数，可是子程序中也使用了 cx，在执行子程序的时候，cx 中保存的循环计数值被改变，使得主程序的循环出错。</p><p>从上面的问题中，实际上引出了一个一般化的问题：<strong>子程序中使用的寄存器，很可能在主程序中也要使用，造成了寄存器使用上的冲突</strong>。</p><p>粗略地看，可以有以下两个方案来避免这种冲突。</p><p>（1）在编写调用子程序的程序时，注意看看子程序中有没有用到会产生冲突的寄存器，如果有，调用者使用别的寄存器；</p><p>（2）在编写子程序的时候，不要使用会产生冲突的寄存器。</p><p>上面两种方案可行性：</p><p>（1）会给调用子程序的程序编写造成很大麻烦，要小心检查可能产生冲突的寄存器，比如主程序的 bx 和 cx 里，cx 寄存器在子程序中用到，主程序循环就不能用。</p><p>（2）第二种方案则完全无法实现，因为编写子程序时不知道未来那个(使用子程序的)主程序的调用情况。</p><p>可见，我们上面所设想的两个方案都不可行。我们希望：</p><p>（1）编写调用子程序的程序的时候不必关心子程序到底使用了哪些寄存器；</p><p>（2）编写子程序的时候不必关心调用者使用了哪些寄存器；</p><p>（3）不会发生寄存器冲突。</p><p>解决这个问题的简捷方法是，在 <strong>子程序的开始将子程序中所有用到的寄存器中的内容都保存起来，在子程序返回前再恢复</strong>。可以用栈来保存寄存器中的内容。</p><p>以后，我们编写子程序的标准框架如下：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>子程序开始：</span></span>
<span class="line"><span>    子程序中使用的寄存器入栈</span></span>
<span class="line"><span>    子程序内容</span></span>
<span class="line"><span>    子程序中使用的寄存器出栈</span></span>
<span class="line"><span>    返回(ret, retf)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>我们改进一下子程序 capital 的设计：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>capital:</span></span>
<span class="line"><span>    push cx</span></span>
<span class="line"><span>    push si</span></span>
<span class="line"><span>change:</span></span>
<span class="line"><span>    mov cl,[si]</span></span>
<span class="line"><span>    mov ch,0</span></span>
<span class="line"><span>    jcxz ok</span></span>
<span class="line"><span>    and byte ptr [si],11011111b</span></span>
<span class="line"><span>    inc si</span></span>
<span class="line"><span>    jmp short change</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ok:</span></span>
<span class="line"><span>    pop si</span></span>
<span class="line"><span>    pop cx</span></span>
<span class="line"><span>    ret</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>要注意寄存器入栈和出栈的顺序(LIFO)。</p>`,216)])])}const o=a(l,[["render",i]]);export{u as __pageData,o as default};
