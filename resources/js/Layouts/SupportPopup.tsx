import { FormLayout, Modal, TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";


const SupportPopup = ({ isActive = false}) => {
    const [modalActive, setModalActive] = useState(isActive);

    const toggleModalActive = useCallback(
        () => setModalActive((modalActive) => !modalActive),
        [],
    );


    return (
        <Modal
          open={modalActive}
          onClose={toggleModalActive}
          title="Contact support"
          primaryAction={{
            content: 'Send',
            onAction: toggleModalActive,
          }}
        >
          <Modal.Section>
            <FormLayout>
              <TextField
                label="Subject"
                value={'supportSubject'}
                autoComplete="off"
              />
              <TextField
                label="Message"
                value={'supportMessage'}
                autoComplete="off"
                multiline
              />
            </FormLayout>
          </Modal.Section>
        </Modal>
      )
}

export default SupportPopup;
