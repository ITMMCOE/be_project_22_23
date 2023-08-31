package org.tensorflow.lite.examples.detection;

import androidx.appcompat.app.AppCompatActivity;

import android.animation.ValueAnimator;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.WindowManager;

import com.airbnb.lottie.LottieAnimationView;


public class SplashScreen extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_splash_screen);

        // Declaring the animation view
        LottieAnimationView animationView
                = findViewById(R.id.animation_view);
        animationView.addAnimatorUpdateListener(
                        (animation) -> {
                            // Do something.
                        });
        animationView
                .playAnimation();

        if (animationView.isAnimating()) {
            // Do something.
        }

        // Custom animation speed or duration.
        ValueAnimator animator
                = ValueAnimator.ofFloat(0f, 1f);
        animator.addUpdateListener(animation -> {
                    animationView.setProgress((float)animation.getAnimatedValue());
                });
        animator.start();


        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(SplashScreen.this, DetectorActivity.class);
                startActivity(intent);
                finish();
            }
        }, 2000); // delay for 2 seconds

    }
}