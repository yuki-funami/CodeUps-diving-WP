'use strict';

jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  /*==========================
  # loading-animation
  ==========================*/
  const webStorage = function () {
    if (sessionStorage.getItem('access')) {
      // 2回目以降アクセス時の処理
      $('.loader').addClass('is-none');
    } else {
      // 初回アクセス時の処理
      sessionStorage.setItem('access', 'true'); //sessionStorageにデータを保存

      $(window).on('load', function () {
        $('.loader__title-wrap').fadeIn(1500);
        $('.loader__title-wrap').delay(1500).fadeOut(300);

        setTimeout(function () {
          $('.loader__left-image').addClass('is-active');
          $('.loader__right-image').addClass('is-active');
        }, 2800);

        $('.loader__title-wrap').queue(function () {
          $(this).addClass('is-loaded').dequeue();
          $('.loader__title-wrap').fadeIn(1200);
        });

        $('.loader').delay(6000).fadeOut('slow', function () {
          $('body').removeClass('no-scroll');
          $('.loader__left-image').removeClass('is-active');
          $('.loader__right-image').removeClass('is-active');
        });
        $('body').addClass('no-scroll');
      });
    }
  }
  webStorage();

  /*==========================
  # hamburger
  ==========================*/
  $('.js-hamburger').on('click', function () {
    const scrollPosition = window.scrollY || window.pageYOffset;
    $('body').toggleClass('is-fixed');
    $('.header').toggleClass('is-open');

    if ($('body').hasClass('is-fixed')) {
      $('body').css('top', '-' + scrollPosition + 'px');
    } else {
      const scrollPos = parseInt($('body').css('top'));
      $('body').css('top', '');
      window.scrollTo(0, -scrollPos);
    }
    return false;
  });

  // spからpcに画面幅が切り替わった際に、sp-navを閉じる
  $(window).resize(function () {
    const windowWidth = $(window).width();
    const pointWidth = 767;

    if (pointWidth < windowWidth) {
      $('body').removeClass('is-fixed');
      $('.header').removeClass('is-open');
    }
    return false;
  });

  /*==========================
  # swiper
  ==========================*/
  // mv
  new Swiper('.js-mv-swiper', {
    loop: true,
    loopedSlides: 3,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 2000,
    autoplay: {
      delay: 12000,
      disableOnInteraction: false,
      waitForTransition: false,
    },
  });

  // campaign
  new Swiper('.js-campaign-swiper', {
    loop: true,
    slidesPerView: 'auto',
    speed: 2000,
    spaceBetween: 24,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      waitForTransition: false,
    },
    navigation: {
      prevEl: '.js-campaign-button-prev',
      nextEl: '.js-campaign-button-next',
    },
    breakpoints: {
      768: {
        spaceBetween: 40,
      },
    },
  });

  /*==========================
  # to-top
  ==========================*/
  // ページトップボタン
  const toTop = $('.js-to-top');
  const mvHeight = $('.js-mv').innerHeight();

  toTop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > mvHeight) {
      toTop.fadeIn();
    } else {
      toTop.fadeOut();
    }
  });

  toTop.click(function () {
    const speed = 350;
    $('body, html').animate({ scrollTop: 0 }, speed, 'swing');
    return false;
  });

  // フッター手前でストップ
  $(window).on('scroll', function () {
    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();
    const footerHeight = $('.footer').innerHeight();

    if (scrollHeight - scrollPosition <= footerHeight) {
      toTop.addClass('is-active');
    } else {
      toTop.removeClass('is-active');
    }
    return false;
  });

  /*==========================
  # color-box
  ==========================*/
  //.js-color-boxの付いた全ての要素に対して下記の処理を行う
  $('.js-color-box').each(function () {
    $(this).append('<div class="color"></div>');
    const color = $(this).find($('.color'));
    const image = $(this).find('img');
    const speed = 700;
    let counter = 0;

    image.css('opacity', '0');
    color.css('width', '0%');
    
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function () {
      if (counter == 0) {
        $(this).delay(200).animate({ 'width': '100%' }, speed,
        function () {
          image.css('opacity', '1');
          $(this).css({
            'left': '0' ,
            'right': 'auto'
          });
          $(this).animate({ 'width': '0%' }, speed);
        });
        counter = 1;
      }
    });
  });

  /*==========================
  # smooth scroll
  ==========================*/
  // $('a[href^="#"]').on('click', function () {
  //   const id = $(this).attr('href');
  //   const position = 0;
  //   const speed = 350;

  //   if (id != '#') {
  //     position = $(id).offset().top;
  //   }
  //   $('html, body').animate({ scrollTop: position }, speed, 'swing');
  //   return false;
  // });

  /*==========================
  # modal
  ==========================*/
  const modalBackground = $('.modal-background');
  // モーダル表示
  $('.js-modal picture img').on('click', function () {
    // 画像の HTML(<img>タグ全体)を、modal__background内にコピー
    modalBackground.html($(this).prop('outerHTML'));
    modalBackground.fadeIn(200);
    $('html, body').css('overflow', 'hidden');
    return false;
  });

  // モーダル非表示
  modalBackground.on('click', function () {
    modalBackground.fadeOut(200);
    $('html, body').removeAttr('style');
    return false;
  });

  /*==========================
  # category
  ==========================*/
  $('.js-category').on('click', function () {
    $('.js-category').removeClass('is-active');
    $(this).addClass('is-active');
    return false;
  });
  
  // // ページロード時にURLからカテゴリーを取得して表示を切り替える
  // $(document).ready(function () {
  //   // URLからcategoryパラメータを取得
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const categoryParam = urlParams.get('category');
  //   // もしcategoryが存在すれば、それに基づいてカードをフィルタリング
  //   if (!categoryParam || categoryParam === 'all') {
  //     $('.js-card').show();
  //     $('.js-category[data-category="all"]').addClass('is-active');
  //   } else {
  //     $('.js-card').hide();
  //     $('.js-category').removeClass('is-active');
  //     $('.js-card').filter('[data-category="' + categoryParam + '"]').show();
  //     $('.js-category[data-category="' + categoryParam + '"]').addClass('is-active');
  //   }
  // });

  // // カテゴリータブをクリックした時の処理
  // $('.js-category').on('click', function () {
  //   // カテゴリー取得
  //   const category = $(this).data('category');
  //   // カテゴリーに応じて表示を切り替え
  //   $('.js-card').hide();
  //   $('.js-category').removeClass('is-active');
  //   $(this).addClass('is-active');
  //   if (category === 'all') {
  //     $('.js-card').fadeIn('fast');
  //   } else {
  //     $('.js-card').filter('[data-category="' + category + '"]').fadeIn('fast');
  //   }

  //   // URLを更新
  //   if (window.location.pathname == '/archive-campaign.html') {
  //     const newUrl = category === 'all' ? './archive-campaign.html' : './archive-campaign.html?category=' + category;
  //     history.pushState(null, null, newUrl);
  //   }
  //   if (window.location.pathname == '/archive-voice.html') {
  //     const newUrl = category === 'all' ? './archive-voice.html' : './archive-voice.html?category=' + category;
  //     history.pushState(null, null, newUrl);
  //   }
  //   return false;
  // });

  // // 戻るボタンをクリックした時の処理
  // $(window).on('popstate', function () {
  //   // URLからcategoryパラメータを取得
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const categoryParam = urlParams.get('category');
  //   if (!categoryParam || categoryParam === 'all') {
  //     $('.js-card').show();
  //     $('.js-category').removeClass('is-active');
  //     $('.js-category[data-category="all"]').addClass('is-active');
  //   } else {
  //     $('.js-card').hide();
  //     $('.js-category').removeClass('is-active');
  //     $('.js-card').filter('[data-category="' + categoryParam + '"]').show();
  //     $('.js-category[data-category="' + categoryParam + '"]').addClass('is-active');
  //   }
  // });

  /*==========================
  # tab
  ==========================*/
  // ページロード時にURLからカテゴリーを取得して表示を切り替える
  $(document).ready(function () {
    // URLからcategoryパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    // もしcategoryが存在すれば、それに基づいてタブをフィルタリング
    if (!categoryParam) {
      $('.page-information-card').filter('[data-category="license"]').show();
      $('.js-tab[data-category="license"]').addClass('is-active');
    } else {
      $('.page-information-card').hide();
      $('.js-tab').removeClass('is-active');
      $('.page-information-card').filter('[data-category="' + categoryParam + '"]').show();
      $('.js-tab[data-category="' + categoryParam + '"]').addClass('is-active');
    }
  });

  // タブをクリックした時の処理
  $('.js-tab').on('click', function () {
    // カテゴリー取得
    const category = $(this).data('category');
    // カテゴリーに応じて表示を切り替え
    $('.page-information-card').hide();
    $('.js-tab').removeClass('is-active');
    $(this).addClass('is-active');
    $('.page-information-card').filter('[data-category="' + category + '"]').fadeIn('fast');

    // URLを更新
    const newUrl = category ? './page-information.html?category=' + category : './page-information.html';
    history.pushState(null, null, newUrl);
    
    return false;
  });

  // 戻るボタンをクリックした時の処理
  $(window).on('popstate', function () {
    // URLからcategoryパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (!categoryParam) {
      $('.page-information-card').hide();
      $('.js-tab').removeClass('is-active');
      $('.page-information-card').filter('[data-category="license"]').show();
      $('.js-tab[data-category="license"]').addClass('is-active');
    } else {
      $('.page-information-card').hide();
      $('.js-tab').removeClass('is-active');
      $('.page-information-card').filter('[data-category="' + categoryParam + '"]').show();
      $('.js-tab[data-category="' + categoryParam + '"]').addClass('is-active');
    }
  });

  /*==========================
  # price
  ==========================*/
  $(document).ready(function () {
    // ページ読み込み時にURLのハッシュがあればスクロール
    scrollToHash();
    
    // 別ページからのリンクがクリックされた場合の処理
    $('a[href*="page-price.html"]').on('click', function() {
      const targetHref = $(this).attr('href');
      const hash = targetHref.split('#')[1];
      if (hash) {
        scrollToHash(hash);
      }
    });

    // ハッシュに対応するtableが存在すればスクロール
    function scrollToHash(hash) {
      const target = hash ? '#' + hash : window.location.hash;
      if ($(target).length) {
        const targetOffset = $(target).offset().top;
        const headerHeight = $('.header').innerHeight();
        const speed = 1;
        $('html, body').animate({ scrollTop: targetOffset - (headerHeight + 20 )}, speed);
      }
      return false;
    }
  });

  /*==========================
  # form
  ==========================*/
  // Contactページのみで機能させたいので、HTMLの<script>に記述したい
  // $(function () {
  //   $(window).on('beforeunload', function (e) {
  //     e.preventDefault();
  //     e.returnValue = '';
  //   });
  //   $('button[type=submit]').on('click', function () {
  //     $(window).off('beforeunload');
  //   });
  // });

  $(document).ready(function () {
    $('.contact-form__error').hide();
    $.validator.addMethod(
      'telNumber',
      function (value, element) {
        return this.optional(element) || /[\d\-]$/.test(value);
      },
      '※半角数字で入力してください。'
    );

    $('.js-form').validate({
      rules: {
        name: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        tel: {
          required: true,
          telNumber: true,
        },
        kind: {
          required: true,
          minlength: 1,
        },
        contents: {
          required: true,
        },
        'inquiries[]': {
          required: true,
        },
        'privacy-policy[]': {
          required: true,
        },
      },
      messages: {
        name: {
          required: '※必須項目が入力されていません。<br class="u-mobile"><span class="u-mobile">&emsp;</span>入力してください。',
        },
        email: {
          required: '※必須項目が入力されていません。<br class="u-mobile"><span class="u-mobile">&emsp;</span>入力してください。',
          email: '※有効なメールアドレスを入力してください。',
        },
        tel: {
          required: '※必須項目が入力されていません。<br class="u-mobile"><span class="u-mobile">&emsp;</span>入力してください。',
        },
        contents: {
          required: '※必須項目が入力されていません。<br class="u-mobile"><span class="u-mobile">&emsp;</span>入力してください。',
        },
        'inquiries[]': {
          required: '※必須項目が選択されていません。<br class="u-mobile"><span class="u-mobile">&emsp;</span>選択してください。',
        },
        'privacy-policy[]': {
          required: '※個人情報の取り扱いについて同意が必要です。',
        },
      },
      errorElement: 'span',
      errorPlacement: function (error, element) { // error: 挿入対象要素, element: validation対象のinput要素
        $('.js-error').html(error);
        element.addClass('is-invalid');
        $('.contact-form__error').show();
      },
    });

    $('.js-form').submit(function () {
      if (!$('.js-form').valid()) {
        return false; //フォーム送信を停止
      } else {
        window.location.href = 'page-contact-thanks.html';
      }
    });
  });

});


/* JavaScriptで記載 */
/*==========================
# accordion
==========================*/
document.addEventListener('DOMContentLoaded', function () {
  setUpAccordion();
});

/*
ブラウザの標準機能(Web Animations API)を使ってアコーディオンのアニメーションを制御します
*/

function setUpAccordion() {
  const details = document.querySelectorAll('.js-details');
  const RUNNING_VALUE = 'running'; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値

  details.forEach(function (element) {
    const summary = element.querySelector('.js-summary');
    const answer = element.querySelector('.js-answer');

    summary.addEventListener('click', function (e) {
      // デフォルトの挙動を無効化
      e.preventDefault();

      // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      // detailsのopen属性を判定
      if (element.open) {
        // アコーディオンを閉じるときの処理

        // アイコン操作用クラスを切り替える(クラスを取り除く)
        element.classList.toggle('is-opened');
        // アニメーションを実行
        const closingAnim = answer.animate(closingAnimKeyframes(answer), animTiming);
        // アニメーション実行中用の値を付与
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーションの完了後に
        closingAnim.onfinish = function () {
          // open属性を取り除く
          element.removeAttribute('open');
          // アニメーション実行中用の値を取り除く
          element.dataset.animStatus = '';
        };
      } else {
        // アコーディオンを開くときの処理

        // open属性を付与
        element.setAttribute('open', 'true');
        // アイコン操作用クラスを切り替える(クラスを付与)
        element.classList.toggle('is-opened');
        // アニメーションを実行
        const openingAnim = answer.animate(openingAnimKeyframes(answer), animTiming);
        // アニメーション実行中用の値を入れる
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーション完了後にアニメーション実行中用の値を取り除く
        openingAnim.onfinish = function () {
          element.dataset.animStatus = '';
        };
      }
    });
  });
}

/*
アニメーションの時間とイージング
*/
const animTiming = {
  duration: 250,
  easing: 'ease-out',
};

/*
アコーディオンを閉じるときのキーフレーム
*/
function closingAnimKeyframes(answer) {
  return [
    {
      height: answer.offsetHeight + 'px', // height: 'auto'だとうまく計算されないため要素の高さを指定する
      opacity: 1,
    },
    {
      height: 0,
      opacity: 0,
    },
  ]
}

/*
アコーディオンを開くときのキーフレーム
*/
function openingAnimKeyframes(answer) {
  return [
    {
      height: 0,
      opacity: 0,
    },
    {
      height: answer.offsetHeight + 'px',
      opacity: 1,
    },
  ];
}


/*==========================
# form
==========================*/
// const form = document.querySelector('.js-form');
// const inputElms = form.querySelectorAll('input');

// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     inputElms.forEach(function (input) {
//       const errorMessage = input.nextElementSibling;
//       input.classList.remove('is-error');
//       errorMessage.textContent = '';
//     });
//     const isValid = form.checkValidity(); // バリデーション実行
//     if (isValid) {
//       alert('submit!');
//     }
//   }, { passive: false }
// );
// inputElms.forEach(function (input) {
//   input.addEventListener('invalid', function (e) {
//     const currentTarget = e.currentTarget;
//     currentTarget.classList.add('is-error');
//     const errorMessage = currentTarget.nextElementSibling;
//     errorMessage.textContent = currentTarget.validationMessage;
//   });
// });