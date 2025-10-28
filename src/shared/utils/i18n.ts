import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const resources = {
  en: {
    translation: {
      layout: {
        subtitle: 'Unified operations across every Aurora branch'
      },
      navigation: {
        dashboard: 'Dashboard',
        bookings: 'Bookings',
        tables: 'Tables',
        customers: 'Customers',
        settings: 'Settings'
      },
      roles: {
        super_admin: 'Super Admin',
        branch_admin: 'Branch Admin',
        staff: 'Staff'
      },
      i18n: {
        language: 'Language'
      },
      tenant: {
        branch: 'Branch',
        switchTitle: 'Select a branch to administer',
        switchCopy: 'Super Admins can jump into any branch context to support local operations.'
      },
      analytics: {
        title: 'Branch performance',
        subtitle: 'Performance snapshot for {{branch}}',
        revenueTrend: 'Revenue trend',
        bookingMix: 'Booking mix'
      },
      bookings: {
        title: 'Upcoming bookings',
        summary: '{{count}} bookings scheduled',
        customer: 'Customer',
        tables: 'Tables',
        window: 'Dining window',
        status: 'Status',
        actions: 'Actions',
        unknownCustomer: 'Walk-in guest',
        unassigned: 'Unassigned',
        selectCustomer: 'Select customer',
        start: 'Start',
        end: 'End',
        partySize: 'Party size',
        notes: 'Notes',
        createTitle: 'Create quick booking',
        createCta: 'Add booking',
        statuses: {
          pending: 'Pending',
          confirmed: 'Confirmed',
          cancelled: 'Cancelled',
          no_show: 'No show'
        },
        maskedContact: 'Contact details hidden for staff roles.',
        errors: {
          invalidWindow: 'Select a valid start and end time.',
          conflict: 'Selected tables already have bookings during this window.'
        }
      },
      tables: {
        title: 'Table management',
        subtitle: 'Floor inventory for {{branch}}',
        capacity: 'Seats {{capacity}}',
        assignments: '{{count}} active bookings',
        changeStatus: 'Update table status',
        seats: 'seats',
        status: {
          available: 'Available',
          occupied: 'Occupied',
          reserved: 'Reserved',
          unavailable: 'Unavailable'
        }
      },
      customers: {
        title: 'Guest intelligence',
        subtitle: 'Profiles synced across channels for {{branch}}',
        filters: {
          all: 'All',
          vip: 'VIP',
          regular: 'Regular',
          blacklist: 'Blacklist'
        },
        tiers: {
          vip: 'VIP',
          regular: 'Regular',
          blacklist: 'Blacklist'
        },
        visits: 'Lifetime visits',
        lastVisit: 'Last visit',
        maskedContact: 'Contact details hidden for staff access controls.'
      },
      settings: {
        title: 'Automation & communications',
        subtitle: 'Applies to {{branch}}',
        automation: 'Automation rules',
        autoConfirm: 'Auto-confirm bookings',
        noShow: 'Auto-cancel no-shows (minutes)',
        noShowHint: 'Guests will be marked as no-show after this threshold.',
        summary: {
          autoConfirm: 'Auto confirm is {{state}}.',
          noShow: 'No-shows marked after {{minutes}} minutes.'
        },
        emailTemplates: 'Email templates',
        emailHint: 'Personalize confirmations and no-show escalations per branch.',
        templates: {
          bookingConfirmation: 'Thank you for booking with Aurora. Your reservation is confirmed.',
          noShowWarning: 'We missed you tonight. Please contact us to reschedule.'
        }
      },
      errors: {
        unauthorizedTitle: 'You do not have access to this area',
        unauthorizedCopy: 'Reach out to your Super Admin to request permissions.'
      },
      common: {
        close: 'Close',
        save: 'Save changes',
        enabled: 'enabled',
        disabled: 'disabled'
      }
    }
  },
  vi: {
    translation: {
      layout: {
        subtitle: 'Quản lý tập trung cho mọi chi nhánh Aurora'
      },
      navigation: {
        dashboard: 'Tổng quan',
        bookings: 'Đặt bàn',
        tables: 'Bàn',
        customers: 'Khách hàng',
        settings: 'Cài đặt'
      },
      roles: {
        super_admin: 'Siêu quản trị',
        branch_admin: 'Quản lý chi nhánh',
        staff: 'Nhân viên'
      },
      i18n: {
        language: 'Ngôn ngữ'
      },
      tenant: {
        branch: 'Chi nhánh',
        switchTitle: 'Chọn chi nhánh cần quản lý',
        switchCopy: 'Siêu quản trị có thể hỗ trợ mọi chi nhánh một cách nhanh chóng.'
      },
      analytics: {
        title: 'Hiệu quả chi nhánh',
        subtitle: 'Ảnh chụp hoạt động của {{branch}}',
        revenueTrend: 'Doanh thu',
        bookingMix: 'Cơ cấu đặt chỗ'
      },
      bookings: {
        title: 'Đặt bàn sắp tới',
        summary: '{{count}} lượt đặt',
        customer: 'Khách hàng',
        tables: 'Bàn',
        window: 'Khung giờ',
        status: 'Trạng thái',
        actions: 'Thao tác',
        unknownCustomer: 'Khách vãng lai',
        unassigned: 'Chưa gán bàn',
        selectCustomer: 'Chọn khách hàng',
        start: 'Bắt đầu',
        end: 'Kết thúc',
        partySize: 'Số khách',
        notes: 'Ghi chú',
        createTitle: 'Tạo đặt bàn nhanh',
        createCta: 'Thêm đặt bàn',
        statuses: {
          pending: 'Chờ xác nhận',
          confirmed: 'Đã xác nhận',
          cancelled: 'Đã hủy',
          no_show: 'Vắng mặt'
        },
        maskedContact: 'Thông tin liên hệ được ẩn đối với nhân viên.',
        errors: {
          invalidWindow: 'Vui lòng chọn khung giờ hợp lệ.',
          conflict: 'Bàn đã được đặt trong khung giờ này.'
        }
      },
      tables: {
        title: 'Quản lý bàn',
        subtitle: 'Sơ đồ bàn của {{branch}}',
        capacity: '{{capacity}} chỗ',
        assignments: '{{count}} đặt bàn đang hoạt động',
        changeStatus: 'Cập nhật trạng thái bàn',
        seats: 'chỗ',
        status: {
          available: 'Trống',
          occupied: 'Đang dùng',
          reserved: 'Đã giữ',
          unavailable: 'Ngưng phục vụ'
        }
      },
      customers: {
        title: 'Hồ sơ khách hàng',
        subtitle: 'Đồng bộ toàn bộ kênh cho {{branch}}',
        filters: {
          all: 'Tất cả',
          vip: 'VIP',
          regular: 'Thân thiết',
          blacklist: 'Hạn chế'
        },
        tiers: {
          vip: 'VIP',
          regular: 'Thân thiết',
          blacklist: 'Hạn chế'
        },
        visits: 'Lượt ghé',
        lastVisit: 'Lần ghé gần nhất',
        maskedContact: 'Thông tin liên hệ đã được ẩn theo phân quyền.'
      },
      settings: {
        title: 'Tự động hóa & truyền thông',
        subtitle: 'Áp dụng cho {{branch}}',
        automation: 'Quy tắc tự động',
        autoConfirm: 'Tự động xác nhận đặt bàn',
        noShow: 'Tự hủy khi vắng mặt (phút)',
        noShowHint: 'Khách sẽ bị đánh dấu vắng mặt sau thời gian này.',
        summary: {
          autoConfirm: 'Tự xác nhận đang {{state}}.',
          noShow: 'Đánh dấu vắng mặt sau {{minutes}} phút.'
        },
        emailTemplates: 'Mẫu email',
        emailHint: 'Cá nhân hóa thông báo xác nhận và nhắc nhở cho từng chi nhánh.',
        templates: {
          bookingConfirmation: 'Cảm ơn quý khách đã đặt bàn tại Aurora. Đơn đặt đã được xác nhận.',
          noShowWarning: 'Chúng tôi đã lỡ hẹn tối nay. Vui lòng liên hệ để sắp xếp lại.'
        }
      },
      errors: {
        unauthorizedTitle: 'Bạn không có quyền truy cập',
        unauthorizedCopy: 'Liên hệ Siêu quản trị để được cấp quyền.'
      },
      common: {
        close: 'Đóng',
        save: 'Lưu thay đổi',
        enabled: 'bật',
        disabled: 'tắt'
      }
    }
  },
  ja: {
    translation: {
      layout: {
        subtitle: 'すべてのオーロラ店舗を一元管理'
      },
      navigation: {
        dashboard: 'ダッシュボード',
        bookings: '予約',
        tables: 'テーブル',
        customers: '顧客',
        settings: '設定'
      },
      roles: {
        super_admin: 'スーパー管理者',
        branch_admin: '店舗管理者',
        staff: 'スタッフ'
      },
      i18n: {
        language: '言語'
      },
      tenant: {
        branch: '店舗',
        switchTitle: '管理する店舗を選択',
        switchCopy: 'スーパー管理者は店舗間をシームレスに切り替えできます。'
      },
      analytics: {
        title: '店舗パフォーマンス',
        subtitle: '{{branch}} のパフォーマンス概要',
        revenueTrend: '売上推移',
        bookingMix: '予約内訳'
      },
      bookings: {
        title: '今後の予約',
        summary: '{{count}} 件の予約',
        customer: '顧客',
        tables: 'テーブル',
        window: '時間帯',
        status: 'ステータス',
        actions: '操作',
        unknownCustomer: '飛び込み',
        unassigned: '未割り当て',
        selectCustomer: '顧客を選択',
        start: '開始',
        end: '終了',
        partySize: '人数',
        notes: 'メモ',
        createTitle: 'クイック予約作成',
        createCta: '予約を追加',
        statuses: {
          pending: '保留',
          confirmed: '確定',
          cancelled: 'キャンセル',
          no_show: '未来店'
        },
        maskedContact: 'スタッフには連絡先がマスクされています。',
        errors: {
          invalidWindow: '有効な開始・終了時刻を選択してください。',
          conflict: '選択したテーブルはこの時間帯に既存の予約があります。'
        }
      },
      tables: {
        title: 'テーブル管理',
        subtitle: '{{branch}} のフロア状況',
        capacity: '{{capacity}} 席',
        assignments: '{{count}} 件の予約',
        changeStatus: 'テーブル状態を更新',
        seats: '席',
        status: {
          available: '空席',
          occupied: '利用中',
          reserved: '予約済み',
          unavailable: '利用不可'
        }
      },
      customers: {
        title: '顧客インサイト',
        subtitle: '{{branch}} の顧客情報',
        filters: {
          all: 'すべて',
          vip: 'VIP',
          regular: '常連',
          blacklist: '要注意'
        },
        tiers: {
          vip: 'VIP',
          regular: '常連',
          blacklist: '要注意'
        },
        visits: '来店回数',
        lastVisit: '最終来店日',
        maskedContact: '連絡先はスタッフには表示されません。'
      },
      settings: {
        title: '自動化と通知',
        subtitle: '{{branch}} に適用',
        automation: '自動化ルール',
        autoConfirm: '予約を自動確定',
        noShow: '未来店の自動キャンセル（分）',
        noShowHint: 'この時間を過ぎると未未来店として処理されます。',
        summary: {
          autoConfirm: '自動確定は{{state}}です。',
          noShow: '{{minutes}}分後に未来店扱い。'
        },
        emailTemplates: 'メールテンプレート',
        emailHint: '各店舗向けに通知文面を調整します。',
        templates: {
          bookingConfirmation: 'ご予約ありがとうございます。予約は確定しました。',
          noShowWarning: '本日はお会いできませんでした。再予約をご検討ください。'
        }
      },
      errors: {
        unauthorizedTitle: 'アクセス権がありません',
        unauthorizedCopy: '権限付与について管理者へお問い合わせください。'
      },
      common: {
        close: '閉じる',
        save: '保存',
        enabled: '有効',
        disabled: '無効'
      }
    }
  }
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    debug: false,
    resources,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
