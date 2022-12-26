# Render Jam (Re-Do)
# CS 440 Computer Graphics, Fall 2022
-----

# Purpose

Re-submission for the render jam assignment.

# Submission

The submission entails an extension of the submission of Homework 04 that is, this render jam 
is concerned with an original ray-traced scene. As per the guidelines of the render jam, this submission
is valid given that bare-bones ray-tracer from the homework is built upon: by adding new materials which 
have a BRDF, secondary and shadow-rays are traced using a whitted tracer and the scene is lit by three
different light sources.

# Compilation Instructions

Given that the ray-tracer is written in `C++` thus, please 
observe the following instructions when compiling and viewing the rendered image:

- Navigate to the folder named, `raytracer`.
- Use the compilation string: `g++ raytracer.cpp brdf/*.cpp cameras/*.cpp geometry/*.cpp light/*.cpp materials/*.cpp samplers/*.cpp tracer/*.cpp utilities/*.cpp world/*.cpp build/renderJam.cpp`
- Execute `a.exe`
- Take the generated file `scene.ppm` and load it in the browser at this PPM viewer [website](https://www.cs.rhodes.edu/welshc/COMP141_F16/ppmReader.html) courtesy of Rhodes College.

**Note**: The image is rendered in `4K` thus, loading the image in the viewer mentioned above takes a few seconds - do not abandon the process thinking the browser is stuck. Additionally, the rendering of the image takes about `~23 seconds` thus, do not also abandon the compilation process thinking its taking too long!  

