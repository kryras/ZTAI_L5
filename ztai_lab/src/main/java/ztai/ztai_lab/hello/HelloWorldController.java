package ztai.ztai_lab.hello;

import org.springframework.web.bind.annotation.*;

@RestController
public class HelloWorldController {
//    @RequestMapping(method = RequestMethod.GET, path ="/hello-world")
//    public String helloWorld() {
//        return "Hello World.";
//    }

    @GetMapping(path = "/hello-world")
    public String helloWorld() {
        return "Hello World.";
    }

    @GetMapping(path = "hello-world-bean")
    public HelloWorldBean helloWorldBean() {
        return new HelloWorldBean("Hello oWorld");
    }

    @GetMapping(path = "hello-world/path-variable/{name}")
    public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
        return new HelloWorldBean(String.format("Hello World %s", name));
    }
}
